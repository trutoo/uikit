declare module '@storybook/addon-actions' {
  type RenderFunction = () => string | string[];
  type StoryDecorator = (story: RenderFunction, context: { kind: string; story: string }) => string | null;
  export function withActions(...actions: string[]): StoryDecorator;
}
