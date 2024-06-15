/*
  Warnings:

  - You are about to drop the `Katalog` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[imagesBackgroundId]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Katalog" DROP CONSTRAINT "Katalog_masterBidangBisnisId_fkey";

-- DropForeignKey
ALTER TABLE "Katalog" DROP CONSTRAINT "Katalog_profileId_fkey";

-- AlterTable
ALTER TABLE "Images" ADD COLUMN     "label" TEXT NOT NULL DEFAULT 'null';

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "imagesBackgroundId" TEXT;

-- DropTable
DROP TABLE "Katalog";

-- CreateTable
CREATE TABLE "KodeOtp" (
    "id" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "nomor" TEXT NOT NULL,
    "otp" INTEGER NOT NULL,

    CONSTRAINT "KodeOtp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ImagesBackground" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ImagesBackground_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Portofolio" (
    "id" TEXT NOT NULL,
    "id_Portofolio" TEXT NOT NULL,
    "namaBisnis" TEXT NOT NULL,
    "alamatKantor" TEXT NOT NULL,
    "tlpn" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "profileId" TEXT,
    "masterBidangBisnisId" TEXT NOT NULL,
    "logoId" TEXT,

    CONSTRAINT "Portofolio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Portofolio_MediaSosial" (
    "id" TEXT NOT NULL,
    "facebook" TEXT,
    "twitter" TEXT,
    "instagram" TEXT,
    "tiktok" TEXT,
    "youtube" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "portofolioId" TEXT,

    CONSTRAINT "Portofolio_MediaSosial_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MasterStatus" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MasterStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Donasi" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "target" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "publishTime" TIMESTAMP(3),
    "catatan" TEXT,
    "progres" TEXT DEFAULT '0',
    "terkumpul" TEXT DEFAULT '0',
    "namaBank" TEXT,
    "rekening" TEXT,
    "akumulasiPencairan" INTEGER DEFAULT 0,
    "totalPencairan" INTEGER DEFAULT 0,
    "authorId" TEXT,
    "imagesId" TEXT,
    "donasiMaster_KategoriId" TEXT,
    "donasiMaster_DurasiId" TEXT,
    "donasiMaster_StatusDonasiId" TEXT DEFAULT '2',

    CONSTRAINT "Donasi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Donasi_TemporaryCreate" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "target" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "imagesId" TEXT,
    "donasiMaster_KategoriId" TEXT,
    "donasiMaster_DurasiId" TEXT,

    CONSTRAINT "Donasi_TemporaryCreate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DonasiMaster_Kategori" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DonasiMaster_Kategori_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DonasiMaster_Durasi" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DonasiMaster_Durasi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Donasi_Cerita" (
    "id" TEXT NOT NULL,
    "pembukaan" TEXT NOT NULL,
    "cerita" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "imagesId" TEXT,
    "donasiId" TEXT,

    CONSTRAINT "Donasi_Cerita_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DonasiMaster_StatusDonasi" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DonasiMaster_StatusDonasi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DonasiMaster_Bank" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "norek" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DonasiMaster_Bank_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DonasiMaster_StatusInvoice" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DonasiMaster_StatusInvoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Donasi_Invoice" (
    "id" TEXT NOT NULL,
    "nominal" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "donasiId" TEXT,
    "donasiMaster_BankId" TEXT,
    "donasiMaster_StatusInvoiceId" TEXT DEFAULT '3',
    "authorId" TEXT,
    "imagesId" TEXT,

    CONSTRAINT "Donasi_Invoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Donasi_Kabar" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "donasiId" TEXT,
    "imagesId" TEXT,

    CONSTRAINT "Donasi_Kabar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Donasi_Notif" (
    "id" TEXT NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,
    "donasi_KabarId" TEXT,

    CONSTRAINT "Donasi_Notif_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Donasi_PencairanDana" (
    "id" TEXT NOT NULL,
    "nominalCair" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "donasiId" TEXT,
    "imagesId" TEXT,

    CONSTRAINT "Donasi_PencairanDana_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "lokasi" TEXT NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "catatan" TEXT,
    "authorId" TEXT,
    "eventMaster_StatusId" TEXT DEFAULT '2',
    "eventMaster_TipeAcaraId" INTEGER,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventMaster_TipeAcara" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EventMaster_TipeAcara_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventMaster_Status" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EventMaster_Status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event_Peserta" (
    "id" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "eventId" TEXT,
    "userId" TEXT,

    CONSTRAINT "Event_Peserta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Voting" (
    "id" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "awalVote" TIMESTAMP(3) NOT NULL,
    "akhirVote" TIMESTAMP(3) NOT NULL,
    "catatan" TEXT,
    "authorId" TEXT NOT NULL,
    "voting_StatusId" TEXT DEFAULT '2',

    CONSTRAINT "Voting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Voting_Status" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Voting_Status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Voting_DaftarNamaVote" (
    "id" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "jumlah" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "votingId" TEXT,

    CONSTRAINT "Voting_DaftarNamaVote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Voting_Kontributor" (
    "id" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "votingId" TEXT,
    "authorId" TEXT,
    "voting_DaftarNamaVoteId" TEXT,

    CONSTRAINT "Voting_Kontributor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Job" (
    "id" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isArsip" BOOLEAN NOT NULL DEFAULT false,
    "catatan" TEXT,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "imagesId" TEXT,
    "authorId" TEXT,
    "masterStatusId" TEXT DEFAULT '2',

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ForumMaster_StatusPosting" (
    "id" SERIAL NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "ForumMaster_StatusPosting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Forum_Posting" (
    "id" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "publishAt" TIMESTAMP(3),
    "diskusi" TEXT NOT NULL,
    "authorId" TEXT,
    "forumMaster_StatusPostingId" INTEGER,

    CONSTRAINT "Forum_Posting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Forum_Komentar" (
    "id" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "komentar" TEXT NOT NULL,
    "forum_PostingId" TEXT,
    "authorId" TEXT,

    CONSTRAINT "Forum_Komentar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ForumMaster_KategoriReport" (
    "id" SERIAL NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,

    CONSTRAINT "ForumMaster_KategoriReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Forum_ReportPosting" (
    "id" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deskripsi" TEXT,
    "forumMaster_KategoriReportId" INTEGER,
    "forum_PostingId" TEXT,
    "userId" TEXT,

    CONSTRAINT "Forum_ReportPosting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Forum_ReportKomentar" (
    "id" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deskripsi" TEXT,
    "forumMaster_KategoriReportId" INTEGER,
    "forum_KomentarId" TEXT,
    "userId" TEXT,

    CONSTRAINT "Forum_ReportKomentar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectCollaboration" (
    "id" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "lokasi" TEXT NOT NULL,
    "purpose" TEXT NOT NULL,
    "benefit" TEXT,
    "isReject" BOOLEAN DEFAULT false,
    "report" TEXT,
    "projectCollaborationMaster_IndustriId" INTEGER,
    "userId" TEXT,
    "projectCollaborationMaster_StatusId" INTEGER DEFAULT 1,

    CONSTRAINT "ProjectCollaboration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectCollaborationMaster_Industri" (
    "id" SERIAL NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ProjectCollaborationMaster_Industri_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectCollaborationMaster_Status" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProjectCollaborationMaster_Status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectCollaboration_Partisipasi" (
    "id" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,
    "projectCollaborationId" TEXT,
    "deskripsi_diri" TEXT NOT NULL,

    CONSTRAINT "ProjectCollaboration_Partisipasi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectCollaboration_RoomChat" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,
    "projectCollaborationId" TEXT,

    CONSTRAINT "ProjectCollaboration_RoomChat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectCollaboration_AnggotaRoomChat" (
    "id" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "projectCollaboration_RoomChatId" TEXT,

    CONSTRAINT "ProjectCollaboration_AnggotaRoomChat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectCollaboration_Message" (
    "id" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "message" TEXT NOT NULL,
    "isFile" BOOLEAN DEFAULT false,
    "userId" TEXT,
    "projectCollaboration_RoomChatId" TEXT,

    CONSTRAINT "ProjectCollaboration_Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectCollaboration_Notifikasi" (
    "id" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "note" TEXT,
    "projectCollaborationId" TEXT NOT NULL,
    "adminId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "ProjectCollaboration_Notifikasi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NomorAdmin" (
    "id" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "nomor" TEXT NOT NULL,

    CONSTRAINT "NomorAdmin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notifikasi" (
    "id" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "appId" TEXT NOT NULL,
    "kategoriApp" TEXT NOT NULL,
    "pesan" TEXT NOT NULL,
    "title" TEXT,
    "status" TEXT,
    "userRoleId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "adminId" TEXT NOT NULL,

    CONSTRAINT "Notifikasi_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Portofolio_id_Portofolio_key" ON "Portofolio"("id_Portofolio");

-- CreateIndex
CREATE UNIQUE INDEX "Portofolio_MediaSosial_portofolioId_key" ON "Portofolio_MediaSosial"("portofolioId");

-- CreateIndex
CREATE UNIQUE INDEX "Donasi_imagesId_key" ON "Donasi"("imagesId");

-- CreateIndex
CREATE UNIQUE INDEX "Donasi_TemporaryCreate_imagesId_key" ON "Donasi_TemporaryCreate"("imagesId");

-- CreateIndex
CREATE UNIQUE INDEX "Donasi_Cerita_imagesId_key" ON "Donasi_Cerita"("imagesId");

-- CreateIndex
CREATE UNIQUE INDEX "Donasi_Cerita_donasiId_key" ON "Donasi_Cerita"("donasiId");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_imagesBackgroundId_key" ON "Profile"("imagesBackgroundId");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_imagesBackgroundId_fkey" FOREIGN KEY ("imagesBackgroundId") REFERENCES "ImagesBackground"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Portofolio" ADD CONSTRAINT "Portofolio_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Portofolio" ADD CONSTRAINT "Portofolio_masterBidangBisnisId_fkey" FOREIGN KEY ("masterBidangBisnisId") REFERENCES "MasterBidangBisnis"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Portofolio" ADD CONSTRAINT "Portofolio_logoId_fkey" FOREIGN KEY ("logoId") REFERENCES "Images"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Portofolio_MediaSosial" ADD CONSTRAINT "Portofolio_MediaSosial_portofolioId_fkey" FOREIGN KEY ("portofolioId") REFERENCES "Portofolio"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Donasi" ADD CONSTRAINT "Donasi_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Donasi" ADD CONSTRAINT "Donasi_imagesId_fkey" FOREIGN KEY ("imagesId") REFERENCES "Images"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Donasi" ADD CONSTRAINT "Donasi_donasiMaster_KategoriId_fkey" FOREIGN KEY ("donasiMaster_KategoriId") REFERENCES "DonasiMaster_Kategori"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Donasi" ADD CONSTRAINT "Donasi_donasiMaster_DurasiId_fkey" FOREIGN KEY ("donasiMaster_DurasiId") REFERENCES "DonasiMaster_Durasi"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Donasi" ADD CONSTRAINT "Donasi_donasiMaster_StatusDonasiId_fkey" FOREIGN KEY ("donasiMaster_StatusDonasiId") REFERENCES "DonasiMaster_StatusDonasi"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Donasi_TemporaryCreate" ADD CONSTRAINT "Donasi_TemporaryCreate_imagesId_fkey" FOREIGN KEY ("imagesId") REFERENCES "Images"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Donasi_TemporaryCreate" ADD CONSTRAINT "Donasi_TemporaryCreate_donasiMaster_KategoriId_fkey" FOREIGN KEY ("donasiMaster_KategoriId") REFERENCES "DonasiMaster_Kategori"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Donasi_TemporaryCreate" ADD CONSTRAINT "Donasi_TemporaryCreate_donasiMaster_DurasiId_fkey" FOREIGN KEY ("donasiMaster_DurasiId") REFERENCES "DonasiMaster_Durasi"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Donasi_Cerita" ADD CONSTRAINT "Donasi_Cerita_imagesId_fkey" FOREIGN KEY ("imagesId") REFERENCES "Images"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Donasi_Cerita" ADD CONSTRAINT "Donasi_Cerita_donasiId_fkey" FOREIGN KEY ("donasiId") REFERENCES "Donasi"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Donasi_Invoice" ADD CONSTRAINT "Donasi_Invoice_donasiId_fkey" FOREIGN KEY ("donasiId") REFERENCES "Donasi"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Donasi_Invoice" ADD CONSTRAINT "Donasi_Invoice_donasiMaster_BankId_fkey" FOREIGN KEY ("donasiMaster_BankId") REFERENCES "DonasiMaster_Bank"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Donasi_Invoice" ADD CONSTRAINT "Donasi_Invoice_donasiMaster_StatusInvoiceId_fkey" FOREIGN KEY ("donasiMaster_StatusInvoiceId") REFERENCES "DonasiMaster_StatusInvoice"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Donasi_Invoice" ADD CONSTRAINT "Donasi_Invoice_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Donasi_Invoice" ADD CONSTRAINT "Donasi_Invoice_imagesId_fkey" FOREIGN KEY ("imagesId") REFERENCES "Images"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Donasi_Kabar" ADD CONSTRAINT "Donasi_Kabar_donasiId_fkey" FOREIGN KEY ("donasiId") REFERENCES "Donasi"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Donasi_Kabar" ADD CONSTRAINT "Donasi_Kabar_imagesId_fkey" FOREIGN KEY ("imagesId") REFERENCES "Images"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Donasi_Notif" ADD CONSTRAINT "Donasi_Notif_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Donasi_Notif" ADD CONSTRAINT "Donasi_Notif_donasi_KabarId_fkey" FOREIGN KEY ("donasi_KabarId") REFERENCES "Donasi_Kabar"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Donasi_PencairanDana" ADD CONSTRAINT "Donasi_PencairanDana_donasiId_fkey" FOREIGN KEY ("donasiId") REFERENCES "Donasi"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Donasi_PencairanDana" ADD CONSTRAINT "Donasi_PencairanDana_imagesId_fkey" FOREIGN KEY ("imagesId") REFERENCES "Images"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_eventMaster_StatusId_fkey" FOREIGN KEY ("eventMaster_StatusId") REFERENCES "EventMaster_Status"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_eventMaster_TipeAcaraId_fkey" FOREIGN KEY ("eventMaster_TipeAcaraId") REFERENCES "EventMaster_TipeAcara"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event_Peserta" ADD CONSTRAINT "Event_Peserta_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event_Peserta" ADD CONSTRAINT "Event_Peserta_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Voting" ADD CONSTRAINT "Voting_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Voting" ADD CONSTRAINT "Voting_voting_StatusId_fkey" FOREIGN KEY ("voting_StatusId") REFERENCES "Voting_Status"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Voting_DaftarNamaVote" ADD CONSTRAINT "Voting_DaftarNamaVote_votingId_fkey" FOREIGN KEY ("votingId") REFERENCES "Voting"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Voting_Kontributor" ADD CONSTRAINT "Voting_Kontributor_votingId_fkey" FOREIGN KEY ("votingId") REFERENCES "Voting"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Voting_Kontributor" ADD CONSTRAINT "Voting_Kontributor_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Voting_Kontributor" ADD CONSTRAINT "Voting_Kontributor_voting_DaftarNamaVoteId_fkey" FOREIGN KEY ("voting_DaftarNamaVoteId") REFERENCES "Voting_DaftarNamaVote"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_imagesId_fkey" FOREIGN KEY ("imagesId") REFERENCES "Images"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_masterStatusId_fkey" FOREIGN KEY ("masterStatusId") REFERENCES "MasterStatus"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Forum_Posting" ADD CONSTRAINT "Forum_Posting_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Forum_Posting" ADD CONSTRAINT "Forum_Posting_forumMaster_StatusPostingId_fkey" FOREIGN KEY ("forumMaster_StatusPostingId") REFERENCES "ForumMaster_StatusPosting"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Forum_Komentar" ADD CONSTRAINT "Forum_Komentar_forum_PostingId_fkey" FOREIGN KEY ("forum_PostingId") REFERENCES "Forum_Posting"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Forum_Komentar" ADD CONSTRAINT "Forum_Komentar_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Forum_ReportPosting" ADD CONSTRAINT "Forum_ReportPosting_forumMaster_KategoriReportId_fkey" FOREIGN KEY ("forumMaster_KategoriReportId") REFERENCES "ForumMaster_KategoriReport"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Forum_ReportPosting" ADD CONSTRAINT "Forum_ReportPosting_forum_PostingId_fkey" FOREIGN KEY ("forum_PostingId") REFERENCES "Forum_Posting"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Forum_ReportPosting" ADD CONSTRAINT "Forum_ReportPosting_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Forum_ReportKomentar" ADD CONSTRAINT "Forum_ReportKomentar_forumMaster_KategoriReportId_fkey" FOREIGN KEY ("forumMaster_KategoriReportId") REFERENCES "ForumMaster_KategoriReport"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Forum_ReportKomentar" ADD CONSTRAINT "Forum_ReportKomentar_forum_KomentarId_fkey" FOREIGN KEY ("forum_KomentarId") REFERENCES "Forum_Komentar"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Forum_ReportKomentar" ADD CONSTRAINT "Forum_ReportKomentar_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectCollaboration" ADD CONSTRAINT "ProjectCollaboration_projectCollaborationMaster_IndustriId_fkey" FOREIGN KEY ("projectCollaborationMaster_IndustriId") REFERENCES "ProjectCollaborationMaster_Industri"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectCollaboration" ADD CONSTRAINT "ProjectCollaboration_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectCollaboration" ADD CONSTRAINT "ProjectCollaboration_projectCollaborationMaster_StatusId_fkey" FOREIGN KEY ("projectCollaborationMaster_StatusId") REFERENCES "ProjectCollaborationMaster_Status"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectCollaboration_Partisipasi" ADD CONSTRAINT "ProjectCollaboration_Partisipasi_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectCollaboration_Partisipasi" ADD CONSTRAINT "ProjectCollaboration_Partisipasi_projectCollaborationId_fkey" FOREIGN KEY ("projectCollaborationId") REFERENCES "ProjectCollaboration"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectCollaboration_RoomChat" ADD CONSTRAINT "ProjectCollaboration_RoomChat_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectCollaboration_RoomChat" ADD CONSTRAINT "ProjectCollaboration_RoomChat_projectCollaborationId_fkey" FOREIGN KEY ("projectCollaborationId") REFERENCES "ProjectCollaboration"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectCollaboration_AnggotaRoomChat" ADD CONSTRAINT "ProjectCollaboration_AnggotaRoomChat_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectCollaboration_AnggotaRoomChat" ADD CONSTRAINT "ProjectCollaboration_AnggotaRoomChat_projectCollaboration__fkey" FOREIGN KEY ("projectCollaboration_RoomChatId") REFERENCES "ProjectCollaboration_RoomChat"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectCollaboration_Message" ADD CONSTRAINT "ProjectCollaboration_Message_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectCollaboration_Message" ADD CONSTRAINT "ProjectCollaboration_Message_projectCollaboration_RoomChat_fkey" FOREIGN KEY ("projectCollaboration_RoomChatId") REFERENCES "ProjectCollaboration_RoomChat"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectCollaboration_Notifikasi" ADD CONSTRAINT "ProjectCollaboration_Notifikasi_projectCollaborationId_fkey" FOREIGN KEY ("projectCollaborationId") REFERENCES "ProjectCollaboration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectCollaboration_Notifikasi" ADD CONSTRAINT "AdminNotifProjectUser" FOREIGN KEY ("adminId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectCollaboration_Notifikasi" ADD CONSTRAINT "UserNotifProjectUser" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notifikasi" ADD CONSTRAINT "Notifikasi_userRoleId_fkey" FOREIGN KEY ("userRoleId") REFERENCES "MasterUserRole"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notifikasi" ADD CONSTRAINT "NotifikasiUser" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notifikasi" ADD CONSTRAINT "NotifikasiAdmin" FOREIGN KEY ("adminId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
