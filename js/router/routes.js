import Dashboard from '../components/Dashboard'
import ResourceIndex from '../components/Index'
import ResourceDetail from '../components/Detail'
import CreateResource from '../components/Create'
import UpdateResource from '../components/Update'
import AttachResource from '../components/Attach'
import UpdateAttachedResource from '../components/UpdateAttached'
import Lens from '../components/Lens'

export default [
    {
        name: 'dashboard',
        path: '/',
        component: Dashboard,
        props: true,
    },
    {
        name: 'index',
        path: '/resources/:resourceName',
        component: ResourceIndex,
        props: true,
    },
    {
        name: 'lens',
        path: '/resources/:resourceName/lens/:lens',
        component: Lens,
        props: true,
    },
    {
        name: 'create',
        path: '/resources/:resourceName/new',
        component: CreateResource,
        props: route => {
            return {
                resourceName: route.params.resourceName,
                viaResource: route.query.viaResource,
                viaResourceId: route.query.viaResourceId,
                viaRelationship: route.query.viaRelationship,
            }
        },
    },
    {
        name: 'edit',
        path: '/resources/:resourceName/:resourceId/edit',
        component: UpdateResource,
        props: route => {
            return {
                resourceName: route.params.resourceName,
                resourceId: route.params.resourceId,
            }
        },
    },
    {
        name: 'attach',
        path: '/resources/:resourceName/:resourceId/attach/:relatedResourceName',
        component: AttachResource,
        props: route => {
            return {
                resourceName: route.params.resourceName,
                resourceId: route.params.resourceId,
                relatedResourceName: route.params.relatedResourceName,
                viaRelationship: route.query.viaRelationship,
                polymorphic: route.query.polymorphic == '1',
            }
        },
    },
    {
        name: 'edit-attached',
        path: '/resources/:resourceName/:resourceId/edit-attached/:relatedResourceName/:relatedResourceId',
        component: UpdateAttachedResource,
        props: route => {
            return {
                resourceName: route.params.resourceName,
                resourceId: route.params.resourceId,
                relatedResourceName: route.params.relatedResourceName,
                relatedResourceId: route.params.relatedResourceId,
                viaRelationship: route.query.viaRelationship,
            }
        },
    },
    {
        name: 'detail',
        path: '/resources/:resourceName/:resourceId',
        component: ResourceDetail,
        props: true,
    },
    {
        name: '403',
        path: '/403',
        component: {
            template: '<div>403 - Forbidden.</div>',
        },
    },
    {
        name: '404',
        path: '/404',
        component: {
            template: '<div>404 - Not Found.</div>',
        },
    },
]
