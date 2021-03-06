import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

// Research模块的组件
import {ResearchAddComponent} from 'src/app/component/research/research-add/research-add.component';
import {ResearchDetailComponent} from 'src/app/component/research/research-detail/research-detail.component';
import {ResearchListComponent} from 'src/app/component/research/research-list/research-list.component';

// Research模块路由
import {ResearchRoutingModule} from './research-routing.module';

// 自定义模块
import {TaskModule} from '../task/task.module';
import {StudentModule} from '../student/student.module';

// 通用
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzTypographyModule} from 'ng-zorro-antd/typography';
// 布局
import {NzDividerModule} from 'ng-zorro-antd/divider';
import {NzGridModule} from 'ng-zorro-antd/grid';
// 导航
import {NzMenuModule} from 'ng-zorro-antd/menu';
import {NzPageHeaderModule} from "ng-zorro-antd/page-header";
import {NzPaginationModule} from 'ng-zorro-antd/pagination';
// 数据录入
import {NzDatePickerModule} from 'ng-zorro-antd/date-picker';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzSelectModule} from 'ng-zorro-antd/select';
// 数据展示
import {NzAvatarModule} from 'ng-zorro-antd/avatar';
import {NzBadgeModule} from 'ng-zorro-antd/badge';
import {NzCardModule} from 'ng-zorro-antd/card';
import {NzCommentModule} from 'ng-zorro-antd/comment';
import {NzListModule} from 'ng-zorro-antd/list';
import {NzTableModule} from 'ng-zorro-antd/table';
import {NzTabsModule} from 'ng-zorro-antd/tabs';
import {NzTimelineModule} from 'ng-zorro-antd/timeline';
// 反馈
import {NzDrawerModule} from 'ng-zorro-antd/drawer';
import {NzMessageModule} from 'ng-zorro-antd/message';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {NzPopconfirmModule} from 'ng-zorro-antd/popconfirm';

@NgModule({
    declarations: [
        ResearchAddComponent,
        ResearchDetailComponent,
        ResearchListComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ResearchRoutingModule,
        TaskModule,
        StudentModule,
        NzButtonModule,
        NzTypographyModule,
        NzDividerModule,
        NzGridModule,
        NzMenuModule,
        NzPageHeaderModule,
        NzPaginationModule,
        NzDatePickerModule,
        NzFormModule,
        NzInputModule,
        NzSelectModule,
        NzAvatarModule,
        NzBadgeModule,
        NzCardModule,
        NzCommentModule,
        NzListModule,
        NzTableModule,
        NzTabsModule,
        NzTimelineModule,
        NzDrawerModule,
        NzMessageModule,
        NzModalModule,
        NzPopconfirmModule,
        ReactiveFormsModule,
    ]
})

export class ResearchModule {
}
