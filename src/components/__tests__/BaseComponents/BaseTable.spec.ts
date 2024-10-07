import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseTable from '@/components/BaseComponents/BaseTable.vue'

vi.mock('@/composables', async () => {
  const actual = await import('@/composables')
  return {
    ...actual,
    useDarkMode: () => ({
      isDark: false
    }),
    useScreenSize: () => ({
      smOrGreater: true
    })
  }
})

describe('BaseTable.vue', () => {
  const items = [
    { id: 1, name: 'Item 1', value: 'Value 1' },
    { id: 2, name: 'Item 2', value: 'Value 2' }
  ]

  const headers = [
    { text: 'Name', value: 'name' },
    { text: 'Value', value: 'value' }
  ]

  it('renders table with items and headers', async () => {
    const wrapper = mount(BaseTable, {
      props: { items, headers },
      global: {
        stubs: {
          BasePagination: true
        }
      }
    })

    await wrapper.vm.$nextTick()

    const ths = wrapper.findAll('thead th')
    expect(ths.length).toBe(3)

    const trs = wrapper.findAll('tbody tr')
    expect(trs.length).toBe(2)
  })

  it('emits edit event when Edit button is clicked', async () => {
    const wrapper = mount(BaseTable, {
      props: {
        items,
        headers: [...headers, { text: 'Edit', value: 'edit' }]
      },
      global: {
        stubs: {
          BasePagination: true
        }
      }
    })

    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('edit')).toBeTruthy()
  })

  it('emits delete event when Delete button is clicked', async () => {
    const wrapper = mount(BaseTable, {
      props: {
        items,
        headers: [...headers, { text: 'Delete', value: 'delete' }]
      },
      global: {
        stubs: {
          BasePagination: true
        }
      }
    })

    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('delete')).toBeTruthy()
  })
})