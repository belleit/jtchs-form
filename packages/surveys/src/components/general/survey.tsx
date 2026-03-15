import { type JSX } from "preact";
import { useCallback, useEffect, useMemo, useRef, useState } from "preact/hooks";
import { SurveyContainerProps } from "@formbricks/types/formbricks-surveys";
import { type TJsEnvironmentStateSurvey, TJsFileUploadParams } from "@formbricks/types/js";
import type {
  TResponseData,
  TResponseTtc,
  TResponseUpdate,
  TResponseVariables,
} from "@formbricks/types/responses";
import { TUploadFileConfig } from "@formbricks/types/storage";
import { TSurveyBlock, TSurveyBlockLogic } from "@formbricks/types/surveys/blocks";
import { TSurveyElement } from "@formbricks/types/surveys/elements";
import { BlockConditional } from "@/components/general/block-conditional";
import { EndingCard } from "@/components/general/ending-card";
import { ErrorComponent } from "@/components/general/error-component";
import { FormbricksBranding } from "@/components/general/formbricks-branding";
import { LanguageSwitch } from "@/components/general/language-switch";
import { ProgressBar } from "@/components/general/progress-bar";
import { RecaptchaBranding } from "@/components/general/recaptcha-branding";
import { ResponseErrorComponent } from "@/components/general/response-error-component";
import { SurveyCloseButton } from "@/components/general/survey-close-button";
import { WelcomeCard } from "@/components/general/welcome-card";
import { AutoCloseWrapper } from "@/components/wrappers/auto-close-wrapper";
import { StackedCardsContainer } from "@/components/wrappers/stacked-cards-container";
import { ApiClient } from "@/lib/api-client";
import { evaluateLogic, performActions } from "@/lib/logic";
import { parseRecallInformation } from "@/lib/recall";
import { ResponseQueue } from "@/lib/response-queue";
import { SurveyState } from "@/lib/survey-state";
import { cn, findBlockByElementId, getDefaultLanguageCode, getElementsFromSurveyBlocks } from "@/lib/utils";
import { TResponseErrorCodesEnum } from "@/types/response-error-codes";

// ─── TTS Hook ────────────────────────────────────────────────────────────────

function useTTS(text: string, muted: boolean) {
  const synthRef = useRef(
    typeof window !== "undefined" ? window.speechSynthesis : null
  );

  const speak = (utterance: string) => {
    if (!synthRef.current) return;
    const utt = new SpeechSynthesisUtterance(utterance);
    utt.rate = 0.95;
    utt.lang = "en-US";
    synthRef.current.speak(utt);
  };

  const playAll = () => {
    if (!synthRef.current || muted || !text) return;
    synthRef.current.cancel();
    speak(text);
  };

  const stop = () => synthRef.current?.cancel();

  // Auto-play on question change
  useEffect(() => {
    if (muted || !text) return;
    playAll();
    return () => synthRef.current?.cancel();
  }, [text, muted]);

  return { playAll, stop };
}

// ─── TTS Controls UI ─────────────────────────────────────────────────────────

interface TTSControlsProps {
  muted: boolean;
  onToggleMute: () => void;
  onReplay: () => void;
}

function TTSControls({ muted, onToggleMute, onReplay }: TTSControlsProps) {
  return (
    <div
      style={{
        display: "flex",
        gap: "8px",
        justifyContent: "flex-end",
        alignItems: "center",
        padding: "4px 8px 0 0",
      }}>
      <button
        onClick={onReplay}
        title="Replay audio"
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          fontSize: "13px",
          color: "#94a3b8",
          padding: "2px 6px",
          borderRadius: "4px",
        }}>
        ↺ Replay
      </button>
      <button
        onClick={onToggleMute}
        title={muted ? "Unmute audio" : "Mute audio"}
        aria-label={muted ? "Unmute audio" : "Mute audio"}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          fontSize: "16px",
          color: muted ? "#cbd5e1" : "#64748b",
          padding: "2px 4px",
          borderRadius: "4px",
        }}>
        {muted ? "🔇" : "🔊"}
      </button>
    </div>
  );
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface VariableStackEntry {
  questionId: string;
  variables: TResponseVariables;
}

// ─── Survey Component ─────────────────────────────────────────────────────────

export function Survey({
  appUrl,
  environmentId,
  isPreviewMode = false,
  userId,
  contactId,
  mode,
  survey,
  styling,
  isBrandingEnabled,
  onDisplay,
  onResponse,
  onClose,
  onFinished,
  onRetry,
  onDisplayCreated,
  onResponseCreated,
  onOpenExternalURL,
  isRedirectDisabled = false,
  prefillResponseData,
  skipPrefilled,
  languageCode,
  getSetIsError,
  getSetIsResponseSendingFinished,
  getSetBlockId,
  getSetResponseData,
  responseCount,
  startAtQuestionId,
  hiddenFieldsRecord,
  shouldResetQuestionId,
  fullSizeCards = false,
  autoFocus,
  action,
  singleUseId,
  singleUseResponseId,
  isWebEnvironment = true,
  getRecaptchaToken,
  isSpamProtectionEnabled,
  dir = "auto",
  setDir,
  placement,
}: SurveyContainerProps) {
  let apiClient: ApiClient | null = null;

  if (appUrl && environmentId) {
    apiClient = new ApiClient({
      appUrl,
      environmentId,
    });
  }

  const surveyState = useMemo(() => {
    if (appUrl && environmentId) {
      if (mode === "inline") {
        return new SurveyState(survey.id, singleUseId, singleUseResponseId, userId, contactId);
      }

      return new SurveyState(survey.id, null, null, userId, contactId);
    }
    return null;
  }, [appUrl, environmentId, mode, survey.id, userId, singleUseId, singleUseResponseId, contactId]);

  const [hasInteracted, setHasInteracted] = useState(false);

  const [localSurvey, setlocalSurvey] = useState<TJsEnvironmentStateSurvey>(survey);
  const [currentVariables, setCurrentVariables] = useState<TResponseVariables>({});

  const responseQueue = useMemo(() => {
    if (appUrl && environmentId && surveyState) {
      return new ResponseQueue(
        {
          appUrl,
          environmentId,
          retryAttempts: 4,
          onResponseSendingFailed: (_, errorCode?: TResponseErrorCodesEnum) => {
            setShowError(true);
            setErrorType(errorCode);

            if (getSetIsError) {
              getSetIsError((_prev) => {});
            }
          },
          onResponseSendingFinished: () => {
            setIsResponseSendingFinished(true);

            if (getSetIsResponseSendingFinished) {
              getSetIsResponseSendingFinished((_prev) => {});
            }
          },
          onQuotaFull: (quotaInfo) => {
            if (quotaInfo.action === "endSurvey") {
              setIsResponseSendingFinished(true);
              setIsSurveyFinished(true);
              setBlockId(quotaInfo.endingCardId);
            }
          },
        },
        surveyState
      );
    }

    return null;
  }, [appUrl, environmentId, getSetIsError, getSetIsResponseSendingFinished, surveyState]);

  const questions = useMemo(() => getElementsFromSurveyBlocks(localSurvey.blocks), [localSurvey.blocks]);

  const originalQuestionRequiredStates = useMemo(() => {
    return questions.reduce<Record<string, boolean>>((acc, question) => {
      acc[question.id] = question.required;
      return acc;
    }, {});
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Only recompute when blocks structure changes
  }, [survey.blocks]);

  const questionRequiredByMap = useRef<Record<string, string[]>>({});

  useEffect(() => {
    setlocalSurvey(survey);
  }, [survey]);

  useEffect(() => {
    setCurrentVariables(
      survey.variables.reduce<TResponseVariables>((acc, variable) => {
        acc[variable.id] = variable.value;
        return acc;
      }, {})
    );
  }, [survey.variables]);

  const autoFocusEnabled = autoFocus ?? window.self === window.top;

  const [blockId, setBlockId] = useState(() => {
    if (startAtQuestionId) {
      const startBlock = findBlockByElementId(localSurvey.blocks, startAtQuestionId);
      return startBlock?.id || localSurvey.blocks[0]?.id;
    } else if (localSurvey.welcomeCard.enabled) {
      return "start";
    }

    return localSurvey.blocks[0]?.id;
  });

  const [errorType, setErrorType] = useState<TResponseErrorCodesEnum | undefined>(undefined);
  const [showError, setShowError] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);
  const [isResponseSendingFinished, setIsResponseSendingFinished] = useState(
    !getSetIsResponseSendingFinished
  );
  const [isSurveyFinished, setIsSurveyFinished] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(languageCode);
  const [loadingElement, setLoadingElement] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [responseData, setResponseData] = useState<TResponseData>(hiddenFieldsRecord ?? {});
  const [_variableStack, setVariableStack] = useState<VariableStackEntry[]>([]);
  const [ttc, setTtc] = useState<TResponseTtc>({});

  // ─── TTS State ──────────────────────────────────────────────────────────────
  const [ttsMuted, setTtsMuted] = useState(false);

  const cardArrangement = useMemo(() => {
    if (localSurvey.type === "link") {
      return styling.cardArrangement?.linkSurveys ?? "straight";
    }
    return styling.cardArrangement?.appSurveys ?? "straight";
  }, [localSurvey.type, styling.cardArrangement?.linkSurveys, styling.cardArrangement?.appSurveys]);

  const currentBlockIndex = localSurvey.blocks.findIndex((b) => b.id === blockId);
  const currentBlock = localSurvey.blocks[currentBlockIndex];

  // ─── TTS Text ───────────────────────────────────────────────────────────────
  // Builds the spoken string from the current block's headline + choices
  const ttsText = useMemo(() => {
    if (!currentBlock) return "";
    return currentBlock.elements
      .map((el: any) => {
        const parts: string[] = [];
        const headline =
          el.headline?.[selectedLanguage] ??
          el.headline?.default ??
          "";
        if (headline) parts.push(headline);
        if (el.choices?.length) {
          const optionLabels = el.choices
            .map((c: any) => c.label?.[selectedLanguage] ?? c.label?.default ?? "")
            .filter(Boolean)
            .join(". ");
          if (optionLabels) parts.push("Your options are: " + optionLabels);
        }
        return parts.join(". ");
      })
      .filter(Boolean)
      .join(". ");
  }, [currentBlock, selectedLanguage]);

  const { playAll: ttsPlayAll, stop: ttsStop } = useTTS(ttsText, ttsMuted);

  const handleToggleMute = () => {
    if (!ttsMuted) {
      ttsStop();
    }
    setTtsMuted((prev) => !prev);
  };

  // ─── End TTS ────────────────────────────────────────────────────────────────

  const contentRef = useRef<HTMLDivElement | null>(null);
  const showProgressBar = !styling.hideProgressBar;
  const getShowSurveyCloseButton = (offset: number) => {
    return offset === 0 && localSurvey.type !== "link";
  };
  const enabledLanguages = localSurvey.languages.filter((lang) => lang.enabled);
  const getShowLanguageSwitch = (offset: number) => {
    return localSurvey.showLanguageSwitch && enabledLanguages.length > 1 && offset <= 0;
  };

  const onFileUpload = async (file: TJsFileUploadParams["file"], params?: TUploadFileConfig) => {
    if (isPreviewMode) {
      return `https://example.com/${file.name}`;
    }

    if (!apiClient) {
      throw new Error("apiClient not initialized");
    }

    const response = await apiClient.uploadFile(
      {
        type: file.type,
        name: file.name,
        base64: file.base64,
      },
      params
    );

    return response;
  };

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [blockId]);

  const createDisplay = useCallback(async () => {
    if (isPreviewMode) {
      if (onDisplayCreated) {
        onDisplayCreated();
      }
      if (onDisplay) {
        onDisplay();
      }
      return;
    }

    if (apiClient && surveyState && responseQueue) {
      try {
        const display = await apiClient.createDisplay({
          surveyId: survey.id,
          ...(userId && { userId }),
          ...(contactId && { contactId }),
        });

        if (!display.ok) {
          // @ts-expect-error -- display.error is of type ApiErrorResponse
          throw new Error(display.error);
        }

        surveyState.updateDisplayId(display.data.id);
        responseQueue.updateSurveyState(surveyState);

        if (onDisplayCreated) {
          onDisplayCreated();
        }
      } catch (err) {
        console.error("error creating display: ", err);
      }
    }
  }, [
    apiClient,
    surveyState,
    responseQueue,
    survey.id,
    userId,
    contactId,
    onDisplayCreated,
    isPreviewMode,
    onDisplay,
  ]);

  useEffect(() => {
    if (appUrl && environmentId) {
      createDisplay();
    } else {
      onDisplay?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- onDisplay should only be called once
  }, []);

  useEffect(() => {
    if (getSetIsError) {
      getSetIsError((value: boolean) => {
        setShowError(value);
      });
    }
  }, [getSetIsError]);

  useEffect(() => {
    if (getSetBlockId) {
      getSetBlockId((value: string) => {
        setBlockId(value);
      });
    }
  }, [getSetBlockId]);

  useEffect(() => {
    if (getSetResponseData) {
      getSetResponseData((value: TResponseData) => {
        setResponseData(value);
      });
    }
  }, [getSetResponseData]);

  useEffect(() => {
    if (getSetIsResponseSendingFinished) {
      getSetIsResponseSendingFinished((value: boolean) => {
        setIsResponseSendingFinished(value);
      });
    }
  }, [getSetIsResponseSendingFinished]);

  useEffect(() => {
    setSelectedLanguage(languageCode);
  }, [languageCode]);

  const onChange = (responseDataUpdate: TResponseData) => {
    const updatedResponseData = { ...responseData, ...responseDataUpdate };
    setResponseData(updatedResponseData);
  };

  const onChangeVariables = (variables: TResponseVariables) => {
    const updatedVariables = { ...currentVariables, ...variables };
    setCurrentVariables(updatedVariables);
  };

  const makeQuestionsRequired = (requiredQuestionIds: string[]): void => {
    const updateElementIfRequired = (element: TSurveyElement) => {
      if (requiredQuestionIds.includes(element.id)) {
        return { ...element, required: true };
      }
      return element;
    };

    const updateBlockElements = (block: TSurveyBlock) => ({
      ...block,
      elements: block.elements.map(updateElementIfRequired),
    });

    setlocalSurvey((prevSurvey) => ({
      ...prevSurvey,
      blocks: prevSurvey.blocks.map(updateBlockElements),
    }));
  };

  const revertRequiredChangesByQuestion = (questionId: string): void => {
    const questionsToRevert = questionRequiredByMap.current[questionId] || [];

    if (questionsToRevert.length > 0) {
      const revertElementIfNeeded = (element: TSurveyElement) => {
        if (questionsToRevert.includes(element.id)) {
          return {
            ...element,
            required: originalQuestionRequiredStates[element.id] ?? element.required,
          };
        }
        return element;
      };

      const updateBlockElements = (block: TSurveyBlock) => ({
        ...block,
        elements: block.elements.map(revertElementIfNeeded),
      });

      setlocalSurvey((prevSurvey) => ({
        ...prevSurvey,
        blocks: prevSurvey.blocks.map(updateBlockElements),
      }));

      delete questionRequiredByMap.current[questionId];
    }
  };

  const pushVariableState = (currentQuestionId: string) => {
    setVariableStack((prevStack) => [
      ...prevStack,
      { questionId: currentQuestionId, variables: { ...currentVariables } },
    ]);
  };

  const popVariableState = () => {
    setVariableStack((prevStack) => {
      const newStack = [...prevStack];
      const poppedState = newStack.pop();
      if (poppedState) {
        setCurrentVariables(poppedState.variables);
      }
      return newStack;
    });
  };

  const evaluateLogicAndGetNextBlockId = (
    data: TResponseData
  ): { nextBlockId: string | undefined; calculatedVariables: TResponseVariables } => {
    const firstEndingId = survey.endings.length > 0 ? survey.endings[0].id : undefined;

    if (blockId === "start")
      return {
        nextBlockId: localSurvey.blocks[0]?.id || firstEndingId,
        calculatedVariables: {},
      };

    if (!currentBlock) {
      console.error(
        "Block not found. blockId:",
        blockId,
        "available blocks:",
        localSurvey.blocks.map((b) => b.id)
      );
      throw new Error("Block not found");
    }

    const localResponseData = { ...responseData, ...data };
    let calculationResults = { ...currentVariables };

    const processLogicRule = (
      logic: TSurveyBlockLogic,
      currentJumpTarget: string | undefined,
      currentRequiredIds: string[]
    ): { jumpTarget: string | undefined; requiredIds: string[]; updatedCalculations: TResponseVariables } => {
      const isLogicMet = evaluateLogic(
        localSurvey,
        localResponseData,
        calculationResults,
        logic.conditions,
        selectedLanguage
      );

      if (!isLogicMet) {
        return {
          jumpTarget: currentJumpTarget,
          requiredIds: currentRequiredIds,
          updatedCalculations: calculationResults,
        };
      }

      const { jumpTarget, requiredQuestionIds, calculations } = performActions(
        localSurvey,
        logic.actions,
        localResponseData,
        calculationResults
      );

      const newJumpTarget = jumpTarget && !currentJumpTarget ? jumpTarget : currentJumpTarget;
      const newRequiredIds = [...currentRequiredIds, ...requiredQuestionIds];
      const updatedCalculations = { ...calculationResults, ...calculations };

      return {
        jumpTarget: newJumpTarget,
        requiredIds: newRequiredIds,
        updatedCalculations,
      };
    };

    const evaluateBlockLogic = () => {
      let firstJumpTarget: string | undefined;
      const allRequiredQuestionIds: string[] = [];

      if (currentBlock.logic && currentBlock.logic.length > 0) {
        for (const logic of currentBlock.logic) {
          const result = processLogicRule(logic, firstJumpTarget, allRequiredQuestionIds);
          firstJumpTarget = result.jumpTarget;
          allRequiredQuestionIds.length = 0;
          allRequiredQuestionIds.push(...result.requiredIds);
          calculationResults = result.updatedCalculations;
        }
      }

      if (!firstJumpTarget && currentBlock.logicFallback) {
        firstJumpTarget = currentBlock.logicFallback;
      }

      return { firstJumpTarget, allRequiredQuestionIds };
    };

    const { firstJumpTarget, allRequiredQuestionIds } = evaluateBlockLogic();

    const handleRequiredQuestions = (requiredIds: string[]) => {
      if (requiredIds.length > 0) {
        if (currentBlock.elements[0]) {
          questionRequiredByMap.current[currentBlock.elements[0].id] = requiredIds;
        }
        makeQuestionsRequired(requiredIds);
      }
    };

    handleRequiredQuestions(allRequiredQuestionIds);

    const nextBlockId = firstJumpTarget || localSurvey.blocks[currentBlockIndex + 1]?.id;

    return {
      nextBlockId,
      calculatedVariables: calculationResults,
    };
  };

  const getWebSurveyMeta = useCallback(() => {
    if (!isWebEnvironment) return {};

    const url = new URL(window.location.href);
    const source = url.searchParams.get("source");

    return {
      url: url.href,
      ...(source ? { source } : {}),
    };
  }, [isWebEnvironment]);

  const onResponseCreateOrUpdate = useCallback(
    async (responseUpdate: TResponseUpdate) => {
      if (!appUrl || !environmentId) {
        onResponse?.({
          data: responseUpdate.data,
          ttc: responseUpdate.ttc,
          finished: responseUpdate.finished,
          variables: responseUpdate.variables,
          language: responseUpdate.language,
          endingId: responseUpdate.endingId,
        });
        return;
      }

      if (isPreviewMode) {
        onResponseCreated?.();

        if (responseUpdate.finished) {
          setIsResponseSendingFinished(true);
        }
        return;
      }

      if (surveyState && responseQueue) {
        if (contactId) {
          surveyState.updateContactId(contactId);
        }

        if (userId) {
          surveyState.updateUserId(userId);
        }

        responseQueue.updateSurveyState(surveyState);
        responseQueue.add({
          data: responseUpdate.data,
          ttc: responseUpdate.ttc,
          finished: responseUpdate.finished,
          language:
            responseUpdate.language === "default" ? getDefaultLanguageCode(survey) : responseUpdate.language,
          meta: {
            ...getWebSurveyMeta(),
            action,
          },
          variables: responseUpdate.variables,
          displayId: surveyState.displayId,
          endingId: responseUpdate.endingId,
          hiddenFields: hiddenFieldsRecord,
        });

        onResponseCreated?.();
      }
    },
    [
      appUrl,
      environmentId,
      isPreviewMode,
      surveyState,
      responseQueue,
      onResponse,
      onResponseCreated,
      contactId,
      userId,
      survey,
      action,
      hiddenFieldsRecord,
      getWebSurveyMeta,
    ]
  );

  useEffect(() => {
    if (isPreviewMode || !survey.recaptcha?.enabled) return;

    if (!isSpamProtectionEnabled) {
      setShowError(true);
      setErrorType(TResponseErrorCodesEnum.InvalidDeviceError);
    }

  }, []);

  useEffect(() => {
    if (isResponseSendingFinished && isSurveyFinished) {
      window.parent.postMessage("formbricksSurveyCompleted", "*"); // NOSONAR typescript:S2819
      onFinished?.();
    }
  }, [isResponseSendingFinished, isSurveyFinished, onFinished]);

  const onSubmit = async (surveyResponseData: TResponseData, responsettc: TResponseTtc) => {
    const respondedElementIds = Object.keys(surveyResponseData);
    const firstRespondedElementId = respondedElementIds[0];

    setLoadingElement(true);

    if (isSpamProtectionEnabled && !surveyState?.responseId && getRecaptchaToken) {
      const token = await getRecaptchaToken();
      if (responseQueue && token) {
        responseQueue.setResponseRecaptchaToken(token);
      } else {
        setShowError(true);
        setErrorType(TResponseErrorCodesEnum.RecaptchaError);
        setLoadingElement(false);
        return;
      }
    }

    pushVariableState(firstRespondedElementId);

    const { nextBlockId, calculatedVariables } = evaluateLogicAndGetNextBlockId(surveyResponseData);
    const finished =
      nextBlockId === undefined || !localSurvey.blocks.map((block) => block.id).includes(nextBlockId);

    setIsSurveyFinished(finished);

    const endingId = nextBlockId
      ? localSurvey.endings.find((ending) => ending.id === nextBlockId)?.id
      : undefined;

    onChange(surveyResponseData);
    onChangeVariables(calculatedVariables);

    onResponseCreateOrUpdate({
      data: surveyResponseData,
      ttc: responsettc,
      finished,
      variables: calculatedVariables,
      language: selectedLanguage,
      endingId,
    });

    if (nextBlockId) {
      setBlockId(nextBlockId);
    } else if (finished) {
      const firstEndingId = localSurvey.endings[0]?.id as string | undefined;
      if (firstEndingId) {
        setBlockId(firstEndingId);
      } else {
        setBlockId("end");
      }
    }
    setHistory([...history, blockId]);
    setLoadingElement(false);
  };

  const onBack = (): void => {
    let prevBlockId: string | undefined;
    if (history.length > 0) {
      const newHistory = [...history];
      prevBlockId = newHistory.pop();
      setHistory(newHistory);
    } else {
      prevBlockId = localSurvey.blocks[currentBlockIndex - 1]?.id;
    }
    popVariableState();
    if (!prevBlockId) throw new Error("Block not found");

    const prevBlock = localSurvey.blocks.find((b) => b.id === prevBlockId);
    if (prevBlock?.elements[0]) {
      revertRequiredChangesByQuestion(prevBlock.elements[0].id);
    }

    setBlockId(prevBlockId);
  };

  const retryResponse = async () => {
    if (responseQueue) {
      setIsRetrying(true);
      const result = await responseQueue.processQueue();
      setIsRetrying(false);

      if (result.success) {
        setShowError(false);
        setErrorType(undefined);
      }
    } else {
      onRetry?.();
    }
  };

  const getCardContent = (blockIdx: number, offset: number): JSX.Element | undefined => {
    if (showError) {
      switch (errorType) {
        case TResponseErrorCodesEnum.ResponseSendingError:
          return (
            <ResponseErrorComponent
              responseData={responseQueue?.getUnsentData() ?? responseData}
              questions={questions}
              onRetry={retryResponse}
              isRetrying={isRetrying}
            />
          );
        case TResponseErrorCodesEnum.RecaptchaError:
        case TResponseErrorCodesEnum.InvalidDeviceError:
          return (
            <>
              {localSurvey.type !== "link" ? (
                <div className="bg-survey-bg flex h-6 justify-end pt-2 pr-2">
                  <SurveyCloseButton onClose={onClose} />
                </div>
              ) : null}
              <ErrorComponent errorType={errorType} />
            </>
          );
      }
    }

    const content = () => {
      if (blockIdx === -1) {
        return (
          <WelcomeCard
            key="start"
            headline={localSurvey.welcomeCard.headline}
            subheader={localSurvey.welcomeCard.subheader}
            fileUrl={localSurvey.welcomeCard.fileUrl}
            buttonLabel={localSurvey.welcomeCard.buttonLabel}
            onSubmit={onSubmit}
            survey={localSurvey}
            languageCode={selectedLanguage}
            responseCount={responseCount}
            autoFocusEnabled={autoFocusEnabled}
            isCurrent={offset === 0}
            responseData={responseData}
            variablesData={currentVariables}
            isPreviewMode={isPreviewMode}
            fullSizeCards={fullSizeCards}
          />
        );
      } else if (blockIdx >= localSurvey.blocks.length) {
        const endingCard = localSurvey.endings.find((ending) => {
          return ending.id === blockId;
        });
        if (endingCard) {
          return (
            <EndingCard
              survey={localSurvey}
              endingCard={endingCard}
              isRedirectDisabled={isRedirectDisabled}
              autoFocusEnabled={autoFocusEnabled}
              isCurrent={offset === 0}
              languageCode={selectedLanguage}
              isResponseSendingFinished={isResponseSendingFinished}
              responseData={responseData}
              variablesData={currentVariables}
              onOpenExternalURL={onOpenExternalURL}
              isPreviewMode={isPreviewMode}
              fullSizeCards={fullSizeCards}
            />
          );
        }
      } else {
        const block = localSurvey.blocks[blockIdx];
        return (
          Boolean(block) && (
            <BlockConditional
              surveyLanguages={localSurvey.languages}
              key={block.id}
              surveyId={localSurvey.id}
              block={{
                ...block,
                elements: block.elements.map((element) =>
                  parseRecallInformation(element, selectedLanguage, responseData, currentVariables)
                ),
              }}
              value={responseData}
              onChange={onChange}
              onSubmit={onSubmit}
              onBack={onBack}
              ttc={ttc}
              setTtc={setTtc}
              onFileUpload={onFileUpload}
              isFirstBlock={block.id === localSurvey.blocks[0]?.id}
              skipPrefilled={skipPrefilled}
              prefilledResponseData={offset === 0 ? prefillResponseData : undefined}
              isLastBlock={block.id === localSurvey.blocks[localSurvey.blocks.length - 1].id}
              languageCode={selectedLanguage}
              autoFocusEnabled={autoFocusEnabled}
              isBackButtonHidden={localSurvey.isBackButtonHidden}
              onOpenExternalURL={onOpenExternalURL}
              dir={dir}
              fullSizeCards={fullSizeCards}
            />
          )
        );
      }
    };

    const isLanguageSwitchVisible = getShowLanguageSwitch(offset);
    const isCloseButtonVisible = getShowSurveyCloseButton(offset);

    // Only show TTS controls on active question cards (not welcome/ending)
    const showTTSControls = offset === 0 && blockIdx >= 0 && blockIdx < localSurvey.blocks.length;

    return (
      <AutoCloseWrapper
        survey={localSurvey}
        onClose={onClose}
        questionIdx={blockIdx}
        hasInteracted={hasInteracted}
        setHasInteracted={setHasInteracted}>
        <div
          className={cn(
            "no-scrollbar bg-survey-bg flex h-full w-full flex-col justify-between overflow-hidden transition-opacity duration-1000 ease-in-out",
            offset === 0 || cardArrangement === "simple" ? "opacity-100" : "opacity-0"
          )}>
          <div className={cn("relative")}>
            <div className="flex w-full flex-col items-end">
              {showProgressBar ? <ProgressBar survey={localSurvey} blockId={blockId} /> : null}

              <div
                className={cn(
                  "relative w-full",
                  isCloseButtonVisible || isLanguageSwitchVisible ? "h-8" : "h-5"
                )}>
                <div className={cn("flex w-full items-center justify-end")}>
                  {isLanguageSwitchVisible && (
                    <LanguageSwitch
                      survey={localSurvey}
                      surveyLanguages={localSurvey.languages}
                      setSelectedLanguageCode={setSelectedLanguage}
                      hoverColor={styling.inputColor?.light ?? "#f8fafc"}
                      borderRadius={styling.roundness ?? 8}
                      setDir={setDir}
                      dir={dir}
                    />
                  )}
                  {isLanguageSwitchVisible && isCloseButtonVisible && (
                    <div aria-hidden="true" className="z-1001 h-5 w-px bg-slate-200" />
                  )}

                  {isCloseButtonVisible && (
                    <SurveyCloseButton
                      onClose={onClose}
                      hoverColor={styling.inputColor?.light ?? "#f8fafc"}
                      borderRadius={styling.roundness ?? 8}
                    />
                  )}
                </div>
              </div>
            </div>

            {/* TTS Controls — rendered above question content on active question cards */}
            {showTTSControls && (
              <TTSControls
                muted={ttsMuted}
                onToggleMute={handleToggleMute}
                onReplay={ttsPlayAll}
              />
            )}

            <div
              ref={contentRef}
              className={cn(
                loadingElement ? "animate-pulse opacity-60" : "",
                fullSizeCards ? "" : "my-auto"
              )}>
              {content()}
            </div>

            <div
              className={cn(
                "flex flex-col justify-center gap-2",
                isCloseButtonVisible || isLanguageSwitchVisible ? "p-2" : "p-3"
              )}>
              {isBrandingEnabled ? <FormbricksBranding /> : null}
              {isSpamProtectionEnabled ? <RecaptchaBranding /> : null}
            </div>
          </div>
        </div>
      </AutoCloseWrapper>
    );
  };

  return (
    <StackedCardsContainer
      cardArrangement={cardArrangement}
      currentBlockId={blockId}
      getCardContent={getCardContent}
      survey={localSurvey}
      styling={styling}
      setBlockId={setBlockId}
      shouldResetBlockId={shouldResetQuestionId}
      fullSizeCards={fullSizeCards}
      placement={placement}
    />
  );
}