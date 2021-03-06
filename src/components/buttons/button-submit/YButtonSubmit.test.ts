import { mount, shallowMount } from '@vue/test-utils';
import YButtonSubmit from './YButtonSubmit.vue';
import { i18n } from '.jest/vue-setup';


describe('YButtonSubmit', () => {

   test('Creates component - shallow', () => {
      const wrapper = shallowMount(YButtonSubmit, { i18n });
      expect(wrapper.is(YButtonSubmit)).toBe(true);
   });

   test('Creates component - full', () => {
      const wrapper = mount(YButtonSubmit, { i18n });
      expect(wrapper.is(YButtonSubmit)).toBe(true);
   });

});


