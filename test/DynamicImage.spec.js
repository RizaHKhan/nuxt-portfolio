import { mount } from '@vue/test-utils'
import DynamicImage from '@/components/DynamicImage'

describe('DynamicImage.vue', () => {
  it('should contain caption if passed as prop', () => {
    const wrapper = mount(DynamicImage, {
      propsData: {
        caption: 'Hello World',
      },
    })

    expect(wrapper.html()).toContain('Hello World')
  })

  it('should have a max-height attribute of 480', () => {
    const wrapper = mount(DynamicImage)
    const image = wrapper.find('.v-image__image')
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.is(DynamicImage)).toBe(true)
    expect(image.exists()).toBe(true)
    // expect(wrapper.findAll('v-image__image').exists()).toBe(true)
  })
})
