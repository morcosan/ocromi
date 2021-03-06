import { mount, shallowMount } from '@vue/test-utils';
import YGroupCheckbox from './YGroupCheckbox.vue';
import { i18n } from '.jest/vue-setup';


describe('YGroupCheckbox', () => {

   test('Creates component - shallow', () => {
      const wrapper = shallowMount(YGroupCheckbox, { i18n });
      expect(wrapper.is(YGroupCheckbox)).toBe(true);
   });

   test('Creates component - full', () => {
      const wrapper = mount(YGroupCheckbox, { i18n });
      expect(wrapper.is(YGroupCheckbox)).toBe(true);
   });

});


