import YButton from './YButton.vue';
import { StoryLine } from '.storybook/custom/story-builder';
import { settingsComputed } from '../../../../.storybook/custom/knob-props';


const vue = {
   components: {
      YButton,
   },
   props: {},
   data() {
      return {
         value: [],
      };
   },
   computed: settingsComputed,
};


const storyLines: StoryLine[] = [
   {
      title: 'Default',
      template: `
         <YButton
            
         />
      `,
      states: ['value'],
   },
];


// export default StoryBuilder.createDefault('Buttons / Button');
// export const default_ = StoryBuilder.createStory(vue, storyLines);
// export const docs = StoryBuilder.createDocs(`
// /**
//  * Used when user needs to take an action.
//  * This type of button is colored and draws attention.
//  */
// `);
