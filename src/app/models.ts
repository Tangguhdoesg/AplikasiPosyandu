export enum userPosyanduType {
    ADMIN = 'Admin',
    PETUGAS = 'Petugas',
    ORANGTUA = 'Orang Tua'
}

export interface userPosyandu {
    idUser: number,
    namaUser: string,
    nikUser: string,
    tanggalLahirUser: string,
    passwordUser: string,
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

