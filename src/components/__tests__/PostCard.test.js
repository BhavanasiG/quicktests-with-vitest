/* eslint-disable no-undef */
import axios from 'axios'
import PostCard from '../PostCard.vue'
import { mount, flushPromises } from '@vue/test-utils'
import { expect } from 'vitest'

const mockPost = {
  userId: 1,
  id: 1,
  title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
  body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto'
}

describe('Post Card Component', () => {
  test('creaetd posts render correctly', () => {
    const title = 'Test post'
    const body = 'test post body'
    const wrapper = mount(PostCard, {
      props: { title, body }
    })

    expect(wrapper.html()).toMatchSnapshot
  })
})
