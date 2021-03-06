import {Component, EventEmitter, Output} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UpdateCompleteForm} from "../../../form/update-complete-form";
import {NzMessageService} from "ng-zorro-antd/message";
import {TaskService} from "../../../service/task.service";

@Component({
    selector: 'app-task-mark',
    templateUrl: './task-mark.component.html',
    styleUrls: ['./task-mark.component.scss']
})
export class TaskMarkComponent {

    completeId: number = 0;
    completeContent: string = "";
    fileUrl: string = "";
    fileName: string = "";
    studentName: number = 0;
    completeState: number = 0;
    updateTime!: Date;

    drawerVisible: boolean = false;

    @Output()
    refreshPage = new EventEmitter<any>();

    constructor(
        private route: ActivatedRoute,
        private taskService: TaskService,
        private messageService: NzMessageService
    ) {
    }

    // 查询完成详情
    queryComplete(): void {
        this.taskService.queryComplete(this.completeId).subscribe(response => {
            console.log("queryComplete()", response);
            if (response.code == 200) {
                this.studentName = response.body.studentName;
                this.completeContent = response.body.completeContent;
                this.completeState = response.body.completeState;
                this.updateTime = response.body.updateTime;
                this.fileUrl = response.body.fileUrl;
                this.fileName = response.body.fileName;
            }
        })
    }

    /**
     * 更新完成情况详情
     * @param completeState 完成情况状态
     */
    updateComplete(completeState: number): void {
        // 更新完成详情表单
        let form: UpdateCompleteForm = new UpdateCompleteForm(
            this.completeId,
            completeState
        );
        const formData = new FormData();
        formData.append('form', JSON.stringify(form));
        // 发起请求
        this.taskService.updateComplete(formData).subscribe(response => {
            console.log("updateComplete()", response);
            if (response.code == 200 && response.body == true) {
                this.messageService.success("批改任务成功!");
            } else {
                this.messageService.success("批改任务失败!");
            }
            this.refreshPage.emit();
        });
        this.closeDrawer();
    }

    openDrawer(completeId: number): void {
        this.drawerVisible = true;
        this.completeId = completeId;
        this.queryComplete();
    }

    closeDrawer(): void {
        this.drawerVisible = false;
    }
}
