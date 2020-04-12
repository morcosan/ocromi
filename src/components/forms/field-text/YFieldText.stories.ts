import YFieldText from './YFieldText.vue';
import StoryBuilder, { StoryLine } from '.storybook/custom/story-builder';
import { propsInputField } from '.storybook/custom/knob-props';


const vue = {
   components: {
      YFieldText,
   },
   props: propsInputField,
   data() {
      return {
         value: '',
         value1: '',
         rules: [
            (val: string) => (val.length < 5 || 'Value must have less than 5 characters'),
         ],
      };
   },
};


const storyLines: StoryLine[] = [
   {
      title: 'Default',
      template: `
         <YFieldText
            v-model="value"
            :label="label"
            :placeholder="placeholder"
            :hint="hint"
            :is-disabled="isDisabled"
            :is-optional="isOptional"
            :hides-optional="hidesOptional"
            :is-readonly="isReadonly"
            :is-mini="isMini"
            :side-label-width="sideLabelWidth"
            :error="error"
         />
      `,
      states: ['value'],
   },
   {
      title: 'With rules (length < 5)',
      template: `
         <YFieldText
            v-model="value1"
            :label="label"
            :placeholder="placeholder"
            :hint="hint"
            :is-disabled="isDisabled"
            :is-optional="isOptional"
            :hides-optional="hidesOptional"
            :is-readonly="isReadonly"
            :is-mini="isMini"
            :side-label-width="sideLabelWidth"
            :rules="rules"
            :error="error"
         />
      `,
      states: ['value1'],
   },
];


export default StoryBuilder.createDefault('Forms / Inputs / Field Text');
export const default_ = StoryBuilder.createStory(vue, storyLines);
export const docs = StoryBuilder.createDocs(`
/**
 * This is the general input field.
 * Used when user needs to enter random text.
 */
`);
