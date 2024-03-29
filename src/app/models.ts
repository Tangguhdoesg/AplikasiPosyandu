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
    idUser: string,
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
    idUser: number,
    nikPetugas: string,
    namaPetugas: string,
    namaKegiatan: string,
    lokasiKegiatan: string,
    tanggalKegiatan: string,
    namaPosterKegiatan: string,
    posterKegiatan: any
}

export interface kegiatanAddEditRequestBody {
    namaKegiatan: string,
    nikPetugas: string
    lokasiKegiatan: string,
    tanggalKegiatan: string,
    posterKegiatan: any
}

export interface healthInfoGraph {
    lingkarKepala: any,
    namaBalita: string,
	umurBalita: string,
    kesehatanBasedOnLength:	string,
	beratBalita: any,
    idBalita: number,
    namaOrangTua: string,
    kesehatanBasedOnWeight: string,
	tinggiBalita: any,
    nikBalita: number,
	lingkarLengan: any,
    medianLength: any,
    medianWeight: any,
    umurMedian: any,
    batasBawahBerat: any,
    batasAtasBerat: any,
    batasBawahPanjang: any,
    batasAtasPanjang: any
}

export interface downloadExcelRequestBody {
    tanggalAwal: string,
    tanggalAkhir: string
}

export interface sendExcelRequestBody {
    tanggalAwal: string,
    tanggalAkhir: string,
    email: string
}

export interface totalInfo {
    start: string,
    end: string,
    ListNumber: any[]
}