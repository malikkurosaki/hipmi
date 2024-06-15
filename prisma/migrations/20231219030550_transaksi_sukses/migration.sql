-- CreateTable
CREATE TABLE "Katalog" (
    "id" TEXT NOT NULL,
    "namaBisnis" TEXT NOT NULL,
    "alamatKantor" TEXT NOT NULL,
    "tlpn" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "profileId" TEXT,
    "masterBidangBisnisId" TEXT NOT NULL,

    CONSTRAINT "Katalog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MasterBidangBisnis" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MasterBidangBisnis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Investasi" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "targetDana" TEXT NOT NULL,
    "hargaLembar" TEXT NOT NULL,
    "totalLembar" TEXT NOT NULL,
    "roi" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "countDown" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "authorId" TEXT,
    "catatan" TEXT,
    "sisaLembar" TEXT NOT NULL,
    "lembarTerbeli" TEXT DEFAULT '0',
    "progress" TEXT DEFAULT '0',
    "masterPeriodeDevidenId" TEXT,
    "masterPembagianDevidenId" TEXT,
    "masterPencarianInvestorId" TEXT,
    "imagesId" TEXT,
    "masterStatusInvestasiId" TEXT DEFAULT '2',
    "masterProgresInvestasiId" TEXT,

    CONSTRAINT "Investasi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MasterPencarianInvestor" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MasterPencarianInvestor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MasterPeriodeDeviden" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MasterPeriodeDeviden_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MasterPembagianDeviden" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MasterPembagianDeviden_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MasterStatusInvestasi" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MasterStatusInvestasi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProspektusInvestasi" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "investasiId" TEXT,

    CONSTRAINT "ProspektusInvestasi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DokumenInvestasi" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "investasiId" TEXT,

    CONSTRAINT "DokumenInvestasi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BeritaInvestasi" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "imagesId" TEXT,
    "investasiId" TEXT NOT NULL,

    CONSTRAINT "BeritaInvestasi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MasterBank" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "norek" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MasterBank_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MasterProgresInvestasi" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MasterProgresInvestasi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TransaksiInvestasi" (
    "id" TEXT NOT NULL,
    "investasiId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "namaBank" TEXT,
    "nomorRekening" TEXT,
    "token" TEXT,
    "redirect_url" TEXT,
    "quantity" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "gross_amount" TEXT NOT NULL,
    "merchant_name" TEXT NOT NULL,
    "status_code" TEXT,
    "status_message" TEXT,
    "transaction_id" TEXT,
    "order_id" TEXT,
    "payment_type" TEXT,
    "transaction_time" TEXT,
    "transaction_status" TEXT,
    "fraud_status" TEXT,
    "pdf_url" TEXT,
    "finish_redirect_url" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "masterStatusTransaksiInvestasiId" TEXT DEFAULT '1',

    CONSTRAINT "TransaksiInvestasi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MasterStatusTransaksiInvestasi" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MasterStatusTransaksiInvestasi_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Investasi_imagesId_key" ON "Investasi"("imagesId");

-- CreateIndex
CREATE UNIQUE INDEX "ProspektusInvestasi_investasiId_key" ON "ProspektusInvestasi"("investasiId");

-- AddForeignKey
ALTER TABLE "Katalog" ADD CONSTRAINT "Katalog_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Katalog" ADD CONSTRAINT "Katalog_masterBidangBisnisId_fkey" FOREIGN KEY ("masterBidangBisnisId") REFERENCES "MasterBidangBisnis"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Investasi" ADD CONSTRAINT "Investasi_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Investasi" ADD CONSTRAINT "Investasi_masterPeriodeDevidenId_fkey" FOREIGN KEY ("masterPeriodeDevidenId") REFERENCES "MasterPeriodeDeviden"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Investasi" ADD CONSTRAINT "Investasi_masterPembagianDevidenId_fkey" FOREIGN KEY ("masterPembagianDevidenId") REFERENCES "MasterPembagianDeviden"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Investasi" ADD CONSTRAINT "Investasi_masterPencarianInvestorId_fkey" FOREIGN KEY ("masterPencarianInvestorId") REFERENCES "MasterPencarianInvestor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Investasi" ADD CONSTRAINT "Investasi_imagesId_fkey" FOREIGN KEY ("imagesId") REFERENCES "Images"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Investasi" ADD CONSTRAINT "Investasi_masterStatusInvestasiId_fkey" FOREIGN KEY ("masterStatusInvestasiId") REFERENCES "MasterStatusInvestasi"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Investasi" ADD CONSTRAINT "Investasi_masterProgresInvestasiId_fkey" FOREIGN KEY ("masterProgresInvestasiId") REFERENCES "MasterProgresInvestasi"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProspektusInvestasi" ADD CONSTRAINT "ProspektusInvestasi_investasiId_fkey" FOREIGN KEY ("investasiId") REFERENCES "Investasi"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DokumenInvestasi" ADD CONSTRAINT "DokumenInvestasi_investasiId_fkey" FOREIGN KEY ("investasiId") REFERENCES "Investasi"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BeritaInvestasi" ADD CONSTRAINT "BeritaInvestasi_imagesId_fkey" FOREIGN KEY ("imagesId") REFERENCES "Images"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BeritaInvestasi" ADD CONSTRAINT "BeritaInvestasi_investasiId_fkey" FOREIGN KEY ("investasiId") REFERENCES "Investasi"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransaksiInvestasi" ADD CONSTRAINT "TransaksiInvestasi_investasiId_fkey" FOREIGN KEY ("investasiId") REFERENCES "Investasi"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransaksiInvestasi" ADD CONSTRAINT "TransaksiInvestasi_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransaksiInvestasi" ADD CONSTRAINT "TransaksiInvestasi_masterStatusTransaksiInvestasiId_fkey" FOREIGN KEY ("masterStatusTransaksiInvestasiId") REFERENCES "MasterStatusTransaksiInvestasi"("id") ON DELETE SET NULL ON UPDATE CASCADE;
