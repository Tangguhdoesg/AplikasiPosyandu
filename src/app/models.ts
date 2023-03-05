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