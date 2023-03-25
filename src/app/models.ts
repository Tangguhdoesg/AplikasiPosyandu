export enum userPosyanduType {
    ADMIN = 'Admin',
    PETUGAS = 'Petugas',
    ORANGTUA = 'Orang Tua'
}

export interface loginRequestBody {
    notelepon: string,
    password: string
}

export interface userPosyandu {
    accessToken?: string,
    idUser: number,
    namaUser: string,
    nikUser: string,
    tanggalLahirUser: string,
    noTeleponUser: string,
    alamatUser: string,
    tipeUser: number
}

export interface userPosyanduRequestBody {
    namaUser: string,
    nikUser: string,
    tanggalLahirUser: string,
    noTeleponUser: string,
    alamatUser: string,
    tipeUser: number
}

export interface balita {
    idBalita: number,
    idOrangTua: number,
    namaOrangTua?: string,
    nikOrangTua?: string,
    namaBalita: string,
    nikBalita: string,
    jenisKelaminBalita: string,
    tempatLahirBalita: string,
    tanggalLahirBalita: string,
    tinggiSaatLahirBalita: number,
    beratSaatLahirBalita: number
}

export interface balitaAddEditRequestBody {
    nikBalita: string,
    namaBalita: string,
    nikOrangTua: number,
    jenisKelaminBalita: string,
    beratSaatLahirBalita: number,
    tinggiSaatLahirBalita: number,
    tempatLahirBalita: string,
    tanggalLahirBalita: string
}

export interface checkup {
    idCheckup: number,
    tinggiBadan: number,
    beratBadan: number,
    lingkarKepala: number,
    lingkarLengan: number,
    catatan: string,
    tanggalCheckup: string,
    tanggalCheckupBerikutnya: string,
    idBalita: number,
    nikBalita: string,
    namaBalita: string,
    namaOrangTua: string,
    umurBalita: number
}

export interface checkupAddEditRequestBody {
    nikBalita?: string,
    tinggiBadan: number,
    beratBadan: number,
    lingkarKepala: number,
    lingkarLengan: number,
    catatan: string,
    tanggalCheckup: string,
    tanggalCheckupBerikutnya: string
}

export interface imunisasi {
    idImunisasi: number,
    idBalita: number,
    nikBalita: string,
    namaBalita: string,
    namaOrangTua: string
    namaImunisasi: string,
    catatanImunisasi: string,
    tanggalImunisasi: string,
    tanggalImunisasiBerikutnya: string,
}

export interface imunisasiAddEditRequestBody {
    nikBalita: string,
    namaImunisasi: string,
    catatanImunisasi: string,
    tanggalImunisasi: string,
    tanggalImunisasiBerikutnya: string,
}

export interface kegiatan {
    idKegiatan: number,
    namaKegiatan: string,
    penanggungJawab: string
    lokasiKegiatan: string,
    tanggalKegiatan: string,
    posterKegiatan: File
}

export interface kegiatanAddEditRequestBody {
    namaKegiatan: string,
    nikPenanggungjawab: string
    lokasiKegiatan: string,
    tanggalKegiatan: string,
    posterKegiatan: File
}