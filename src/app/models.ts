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
    namaBalita: string,
    nikBalita: string,
    jenisKelaminBalita: string,
    tempatLahirBalita: string,
    tanggalLahirBalita: string,
    tinggiSaatLahirBalita: number,
    beratSaatLahirBalita: number
}

export interface balitaAddRequestBody {
    nikBalita: string,
    idOrangTua: number,
    jenisKelaminBalita: string,
    beratSaatLahirBalita: number,
    tinggiSaatLahirBalita: number,
    tempatLahirBalita: string,
    tanggalLahirBalita: string,
    namaBalita: string
}

export interface balitaEditRequestBody {
    namaBalita: string,
    jenisKelaminBalita: string,
    tanggalLahirBalita: string,
    tempatLahirBalita: string,
    tinggiSaatLahirBalita: number,
    beratSaatLahirBalita: number
}
