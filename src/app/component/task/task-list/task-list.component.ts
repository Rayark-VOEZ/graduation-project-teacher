import {Component, OnInit, ViewChild} from '@angular/core';

import {TaskEntity} from 'src/app/entity/task.entity';
import {Research} from 'src/app/entity/research.entity';

import {QueryResearchListForm} from 'src/app/form/query-research-list-form';
import {QueryTaskListForm} from 'src/app/form/query-task-list-form';

import {NzMessageService} from "ng-zorro-antd/message";
import {ResearchService} from 'src/app/service/research.service';
import {TaskService} from 'src/app/service/task.service';

import {TaskFormComponent} from '../task-form/task-form.component';
import {TaskDetailComponent} from "../task-detail/task-detail.component";
import {StorageUtil} from "../../../util/storage.util";
import {StudentService} from "../../../service/student.service";
import {Student} from "../../../entity/student.entity";
import {FormBuilder} from "@angular/forms";
import {TaskReleaseComponent} from "../task-release/task-release.component";

@Component({
    selector: 'app-task-list',
    templateUrl: './task-list.component.html',
    styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

    teacherId: number = 0;
    researchId: number = 0;
    taskName: string = "";
    taskState: number = 0;
    endTime!: Date;

    pageIndex: number = 1;
    pageSize: number = 10;
    total!: number;

    researchList: Research[] = [];
    studentList: Student[] = [];
    taskList: TaskEntity[] = [];
    studentIdList: number[] = [];

    // taskReleaseModelVisible: boolean = false;

    @ViewChild('taskDetailDrawer')
    taskDetailDrawer!: TaskDetailComponent;
    @ViewChild('taskFormDrawer')
    taskFormDrawer!: TaskFormComponent;
    @ViewChild('taskReleaseComponent')
    taskReleaseModal!: TaskReleaseComponent;

    // releaseTaskForm = new FormBuilder().group({
    //    endTime: [null, Validators.required],
    //     studentIdList: [null, Validators.required],
    // });

    constructor(
        private formBuilder: FormBuilder,
        private messageService: NzMessageService,
        private researchService: ResearchService,
        private studentService: StudentService,
        private storageUtil: StorageUtil,
        private taskService: TaskService,
    ) {
    }

    // ???????????????
    ngOnInit(): void {
        this.teacherId = this.storageUtil.get("auth").teacherId;
        this.queryResearchList();
        this.queryTaskList();
    }

    // ???????????????
    checkedChange(event: any): void {
        this.studentIdList = event;
    }

    // ????????????
    deleteTask(taskId: number): void {
        this.taskService.deleteTask(taskId).subscribe(response => {
            console.log("deleteTask", response);
            if (response.code == 200 && response.body == true) {
                this.messageService.success("??????????????????!");
                this.queryTaskList();
            }
        })
    }

    // ??????????????????
    queryResearchList(): void {
        // ????????????????????????
        let queryResearchListForm = new QueryResearchListForm(
            this.teacherId,
            ""
        );
        // ????????????
        this.researchService.queryResearchList(queryResearchListForm).subscribe(response => {
            console.log("queryResearchList()", response);
            if (response.code == 200) {
                this.researchList = response.body;
            }
        })
    }

    // ??????????????????
    // queryStudentList(researchId: number): void {
    //     let form = new QueryStudentListForm(
    //         this.teacherId,
    //         "",
    //         researchId,
    //         null,
    //         0,
    //         0
    //     );
    //     this.studentService.queryStudentList(form).subscribe(response => {
    //         console.log("queryStudentList()", response);
    //         if (response.code == 200) {
    //             this.studentList = response.body.studentList;
    //         }
    //     })
    // }

    // ??????????????????
    queryTaskList(): void {
        // ????????????????????????
        let queryTaskListForm = new QueryTaskListForm(
            this.teacherId,
            this.researchId,
            this.taskName,
            this.taskState,
            this.pageIndex,
            this.pageSize
        );
        console.log("queryTaskListForm", queryTaskListForm);
        // ????????????
        this.taskService.queryTaskList(queryTaskListForm).subscribe(response => {
            console.log("queryTaskList()", response);
            if (response.code == 200) {
                this.taskList = response.body.taskList;
                this.total = response.body.total;
            }
        })
    }

    // ????????????
    // updateTask(modelRef: NzModalRef, taskId: number): void {
    //     // ??????????????????
    //     let form = new UpdateTaskForm(
    //         taskId,
    //         0,
    //         "",
    //         "",
    //         2,
    //         this.endTime,
    //         this.studentIdList
    //     );
    //     console.log(form);
    //     modelRef.destroy();
    //     // ????????????
    //     this.taskService.updateTask(form).subscribe(response => {
    //         console.log("updateTask()", response);
    //         if (response.code == 200 && response.body == true) {
    //             this.messageService.success("??????????????????!");
    //         } else {
    //             this.messageService.error("??????????????????!");
    //         }
    //         this.queryTaskList();
    //     })
    // }

    // ??????????????????
    openTaskFormDrawer(taskId: number, researchId: number): void {
        this.taskFormDrawer?.openDrawer(taskId, researchId);
    }

    // ??????????????????
    openTaskDetailDrawer(taskId: number): void {
        this.taskDetailDrawer.openDrawer(taskId);
    }

    openTaskReleaseModal(taskId: number, researchId: number): void {
        this.taskReleaseModal.openModal(taskId, researchId);
    }

    pageIndexChange(): void {
        this.queryTaskList();
    }

    pageSizeChange(): void {
        this.queryTaskList();
    }
}
