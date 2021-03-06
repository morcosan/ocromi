import { mount, shallowMount } from '@vue/test-utils';
import YFieldNumber from './YFieldNumber.vue';
import { i18n } from '.jest/vue-setup';


describe('YFieldNumber', () => {

   test('Creates component - shallow', () => {
      const wrapper = shallowMount(YFieldNumber, { i18n });
      expect(wrapper.is(YFieldNumber)).toBe(true);
   });

   test('Creates component - full', () => {
      const wrapper = mount(YFieldNumber, { i18n });
      expect(wrapper.is(YFieldNumber)).toBe(true);
   });

});


