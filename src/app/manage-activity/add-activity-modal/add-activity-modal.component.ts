import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import * as dayjs from 'dayjs';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { Subject, takeUntil } from 'rxjs';
import { AppServiceService } from 'src/app/app-service.service';
import { kegiatan, kegiatanAddEditRequestBody } from 'src/app/models';

@Component({
  selector: 'app-add-activity-modal',
  templateUrl: './add-activity-modal.component.html',
  styleUrls: ['./add-activity-modal.component.scss']
})
export class AddActivityModalComponent {
  destroySubject$: Subject<void> = new Subject();
  activity: kegiatan | null = null;
  validationForm: FormGroup;

  modalTitle: any;
  selectedActivityDate: any;
  selectedFiles: FileList | undefined;
  currentFile: File | null | undefined;

  isLoading: boolean = false;
  isError: boolean = false;

  constructor(public modalRef: MdbModalRef<AddActivityModalComponent>,
    private service: AppServiceService,
    private datePipe: DatePipe) {
    this.validationForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      pic: new FormControl(null, Validators.required),
      location: new FormControl(null, Validators.required),
      activityDate: new FormControl(null, Validators.required)
    });
  }

  ngOnInit(): void {
    this.modalTitle = this.activity === undefined ? 'Tambah Kegiatan' : 'Ubah Kegiatan';
    if (this.activity !== undefined) {
      this.validationForm.get('name')?.setValue(this.activity?.namaKegiatan);
      this.validationForm.get('pic')?.setValue(this.activity?.nikPetugas);
      this.validationForm.get('location')?.setValue(this.activity?.lokasiKegiatan);
      this.selectedActivityDate = this.datePipe.transform(dayjs(this.activity?.tanggalKegiatan).format('MM-DD-YYYY'), "yyyy-MM-dd");
    }
  }

  onSubmit() {
    if (this.selectedFiles) {
      this.currentFile = this.selectedFiles!.item(0);
    }

    const formData: FormData = new FormData();
    formData.append('lokasiKegiatan', this.validationForm.get('location')?.value);
    formData.append('namaKegiatan', this.validationForm.get('name')?.value);
    formData.append('nikPetugas', this.validationForm.get('pic')?.value);
    formData.append('tanggalKegiatan', this.validationForm.get('activityDate')?.value);
    formData.append('posterKegiatan', this.currentFile!);

    if (this.activity === undefined) {
      this.addActivity(formData);
    } else {
      this.editActivity(formData, this.activity?.idKegiatan!);
    }
  }

  addActivity(req: FormData) {
    this.isLoading = true;
    this.isError = false;
    this.service.addActivity(req)
      .pipe(takeUntil(this.destroySubject$))
      .subscribe(data => {
        this.isLoading = false;
        this.modalRef.close('submit');

      }, err => {
        this.isError = true;
        this.isLoading = false;
      })
  }

  editActivity(req: FormData, id: number) {
    this.isLoading = true;
    this.isError = false;
    this.service.editActivity(req, id)
      .pipe(takeUntil(this.destroySubject$))
      .subscribe(data => {
        this.isLoading = false;
        this.modalRef.close('submit');
      }, err => {
        this.isError = true;
        this.isLoading = false;
      })
  }

  selectFile(event: any) {
    this.selectedFiles = event.target.files;
  }

  get name(): AbstractControl {
    return this.validationForm.get('name')!;
  }

  get pic(): AbstractControl {
    return this.validationForm.get('pic')!;
  }

  get location(): AbstractControl {
    return this.validationForm.get('location')!;
  }

  get activityDate(): AbstractControl {
    return this.validationForm.get('activityDate')!;
  }

  get poster(): AbstractControl {
    return this.validationForm.get('poster')!;
  }
}
