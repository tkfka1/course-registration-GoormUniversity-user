import { Layout, List } from '@/views/app';

export default {
    path: '/app',
    component: Layout,
    children: [
        { path: '', component: List }
    ]
};
