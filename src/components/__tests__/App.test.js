import { mount, flushPromises } from '@vue/test-utils'
import axios from 'axios'
import App from '../../App.vue'
import { describe } from 'vitest'

const mockPost = {
  userId: 1, //this is necessary for the API call
  id: 1,
  title: 'Test Post',
  body: 'test body'
}

describe('Posts App', () => {
  test('user can create post', async () => {
    vi.spyOn(axios, 'post').mockResolvedValueOnce({ data: mockPost })

    const wrapper = mount(App)

    await wrapper.find('[data-testid="title-input"]').setValue(mockPost.title)
    await wrapper.find('[data-testid="body-input"]').setValue(mockPost.body)

    await wrapper.find('[data-testid="post-form"]').trigger('submit')

    expect(wrapper.find('[type="submit"]').html()).toContain('Creating...')

    await flushPromises()

    expect(wrapper.html()).toContain(mockPost.title)
    expect(wrapper.html()).toContain(mockPost.body)
  })

  describe('user gets notified', () => {
    test('when attempting to create a post with incomplete fields', async () => {
      const wrapper = mount(App)

      await wrapper.find('[data-testid="post-form"]').trigger('submit')

      expect(wrapper.html()).toContain('Please input post title')

      await wrapper.find('[data-testid="close-notification"]').trigger('click')

      expect(wrapper.html()).not.toContain('Please input post title')

      await wrapper.find('[data-testid="title-input"]').setValue(mockPost.title)
      await wrapper.find('[data-testid="post-form"]').trigger('submit')

      expect(wrapper.html()).toContain('Please input post body')
    })

    test('when creating creating a new post fails', async () => {
      vi.spyOn(axios, 'post').mockRejectedValueOnce(new Error('Error occurred'))

      const wrapper = mount(App)

      await wrapper.find('[data-testid="title-input"]').setValue(mockPost.title)
      await wrapper.find('[data-testid="body-input"]').setValue(mockPost.body)

      await wrapper.find('[data-testid="post-form"]').trigger('submit')

      expect(wrapper.find('[type="submit"]').html()).toContain('Creating...')

      await flushPromises()

      expect(wrapper.html()).toContain('Error occurred')
    })
  })
})
