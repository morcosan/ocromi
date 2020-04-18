import YButtonReset from './YButtonReset.vue';
import YButtonSubmit from './../button-submit/YButtonSubmit.vue';
import YForm from '../../forms/form/YForm.vue';
import YCheckbox from '../../forms/checkbox/YCheckbox.vue';
import YFieldText from '../../forms/field-text/YFieldText.vue';
import StoryBuilder from '.storybook/custom/story-builder';
import { propsButton } from '.storybook/custom/knob-props';
import { text } from '@storybook/addon-knobs';


const vue = {
   components: {
      YForm,
      YCheckbox,
      YFieldText,
      YButtonReset,
      YButtonSubmit,
   },
   props: {
      ...propsButton,
      label: {
         default: () => text('Label', 'Reset'),
      },
   },
   data() {
      return {
         fullName: '',
         hasTOS: false,
         hasSpam: false,
      };
   },
   methods: {
      onSubmit() {
         console.log('Submitting...');
         setTimeout(() => {
            console.log('Form submitted');
            // @ts-ignore
            this.$refs.form.onSubmitComplete();
         }, 2000);
      },

      onReset() {
         console.log('Form reset');
      },
   },
};


const basicFormTemplate = `
<YForm 
   class="story-form-panel"
   @submit="onSubmit"
   @reset="onReset" 
   ref="form"
>
   <YFieldText
      v-model="fullName"
      label="Full name"
   />
   
   <YCheckbox 
      v-model="hasTOS"
      side-label-width=""
      error="You must agree with our terms"
   >
      I agree with terms of service
   </YCheckbox>
   
   <YButtonSubmit label="Submit"/>
   
   <YButtonReset
      :label="label"
      :is-disabled="isDisabled"
      @reset="onReset" 
   />
</YForm>
`;


export default StoryBuilder.createDefault('Buttons / Button Reset');
export const default_ = StoryBuilder.createBasicStory(vue, basicFormTemplate);
export const docs = StoryBuilder.createDocs(`
/**
 * Used when user needs to take clear the form.
 */
`);
