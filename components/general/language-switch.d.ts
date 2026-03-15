import { TJsEnvironmentStateSurvey } from '@formbricks/types/js';
import { TSurveyLanguage } from '@formbricks/types/surveys/types';
interface LanguageSwitchProps {
    survey: TJsEnvironmentStateSurvey;
    surveyLanguages: TSurveyLanguage[];
    setSelectedLanguageCode: (languageCode: string) => void;
    setFirstRender?: (firstRender: boolean) => void;
    hoverColor?: string;
    borderRadius?: number | string;
    dir?: "ltr" | "rtl" | "auto";
    setDir?: (dir: "ltr" | "rtl" | "auto") => void;
}
export declare function LanguageSwitch({ survey, surveyLanguages, setSelectedLanguageCode, setFirstRender, hoverColor, borderRadius, dir, setDir, }: LanguageSwitchProps): import("preact").JSX.Element;
export {};
//# sourceMappingURL=language-switch.d.ts.map