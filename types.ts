
export interface Link {
  title: string;
  url: string;
}

export interface HelpCenter {
  name: string;
  url: string;
}

export interface Tool {
  name: string;
  url: string;
}

export interface Resources {
  links: Link[];
  helpCenters: HelpCenter[];
  tools: Tool[];
}

export interface MakeAutomation {
  description: string;
  steps: string[];
}

export interface StartupIdea {
  title: string;
  description: string;
  howToStart: string;
  howToSucceed: string;
  howToScale: string;
  monthlyBenefits: string;
  resources: Resources;
  makeAutomation: MakeAutomation;
}

export interface GeminiResponse {
  ideas: StartupIdea[];
}
