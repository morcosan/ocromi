import YFieldPassword from './YFieldPassword.vue';
import StoryBuilder, { StoryLine } from '.storybook/custom/story-builder';
import { groupId, propsInputField, settingsComputed } from '.storybook/custom/knob-props';
import { boolean } from '@storybook/addon-knobs';


const vue = {
   components: {
      YFieldPassword,
   },
   props: {
      ...propsInputField,
      hasMeter: {
         default: () => boolean('Has Meter', false, groupId),
      },
   },
   data() {
      return {
         value: '',
      };
   },
   computed: settingsComputed,
};


const storyLines: StoryLine[] = [
   {
      title: 'Default',
      template: `
         <YFieldPassword
            v-model="value"
            :label="label"
            :placeholder="placeholder"
            :hint="hint"
            :is-disabled="isDisabled"
            :is-optional="isOptional"
            :hides-optional="hidesOptional"
            :is-readonly="isReadonly"
            :error="error"
            :has-meter="hasMeter"
            :is-mini="isMini"
            :side-label-width="sideLabelWidth"
         />
      `,
      states: ['value'],
   },
];


export default StoryBuilder.createDefault('Forms / Inputs / Field Password');
export const default_ = StoryBuilder.createStory(vue, storyLines);
export const docs = StoryBuilder.createDocs(`
/**
 * Used when the user must enter a custom password.
 */
`);
