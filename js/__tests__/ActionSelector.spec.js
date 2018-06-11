import { mount, shallowMount } from '@vue/test-utils'
import ActionSelector from '@/components/ActionSelector'
import flushPromises from 'flush-promises'

describe('ActionSelector', () => {
    test('it renders correctly with actions and pivot action', () => {
        const wrapper = shallowMount(ActionSelector, {
            stubs: ['portal'],
            propsData: {
                selectedResources: [1, 2, 3],
                resourceName: 'posts',
                actions: [
                    { uriKey: 'action-1', name: 'Action 1' },
                    { uriKey: 'action-2', name: 'Action 2' },
                ],
                pivotActions: [
                    { uriKey: 'action-3', name: 'Action 3' },
                    { uriKey: 'action-4', name: 'Action 4' },
                ],
                pivotName: 'Pivot',
            },
        })

        expect(wrapper).toMatchSnapshot()
    })
})
