import prisma from "./../src/app/lib/prisma";
// import { generate_seeder } from "./../src/app_modules/_global/fun/generate_seeder";
import bidangBisnis from "./../src/bin/seeder/bidang_bisnis.json";
import collaboration_industri from "./../src/bin/seeder/colab/master_industri.json";
import collaboration_status from "./../src/bin/seeder/colab/master_status.json";
import donasi_namaBank from "./../src/bin/seeder/donasi/master_bank.json";
import donasi_durasi from "./../src/bin/seeder/donasi/master_durasi.json";
import donasi_kategori from "./../src/bin/seeder/donasi/master_kategori.json";
import donasi_status from "./../src/bin/seeder/donasi/master_status.json";
import donasi_status_invoice from "./../src/bin/seeder/donasi/master_status_invoice.json";
import event_status from "./../src/bin/seeder/event/master_status.json";
import event_tipe_acara from "./../src/bin/seeder/event/master_tipe_acara.json";
import forum_kategori_report from "./../src/bin/seeder/forum/master_report.json";
import forum_status_posting from "./../src/bin/seeder/forum/master_status.json";
import jenisProgres from "./../src/bin/seeder/investasi/master_progres.json";
import namaBank from "./../src/bin/seeder/investasi/nama_bank.json";
import pembagianDeviden from "./../src/bin/seeder/investasi/pembagian_deviden.json";
import pencarianInvestor from "./../src/bin/seeder/investasi/pencarian_investor.json";
import periodeDeviden from "./../src/bin/seeder/investasi/periode_deviden.json";
import statusInvestasi from "./../src/bin/seeder/investasi/status_investasi.json";
import statusTransaksiInvestasi from "./../src/bin/seeder/investasi/status_transaksi_investasi.json";
import master_status from "./../src/bin/seeder/master_status.json";
import nomor_admin from "./../src/bin/seeder/nomor_admin.json";
import userRole from "./../src/bin/seeder/user_role.json";
import userSeeder from "./../src/bin/seeder/user_seeder.json";
import voting_status from "./../src/bin/seeder/voting/master_status.json";

(async () => {
  console.log("start");
  for (let i of userRole) {
    await prisma.masterUserRole.upsert({
      where: {
        id: i.id.toString(),
      },
      update: {
        id: i.id.toString(),
        name: i.name,
      },
      create: {
        id: i.id.toString(),
        name: i.name,
      },
    });
  }

  for (let i of userSeeder) {
    await prisma.user.upsert({
      where: {
        nomor: i.nomor,
      },
      create: {
        nomor: i.nomor,
        username: i.name,
        masterUserRoleId: i.masterUserRoleId,
      },
      update: {
        nomor: i.nomor,
        username: i.name,
        masterUserRoleId: i.masterUserRoleId,
      },
    });
  }

  for (let i of bidangBisnis) {
    await prisma.masterBidangBisnis.upsert({
      where: {
        id: i.id.toString(),
      },
      update: {
        id: i.id.toString(),
        name: i.name,
      },
      create: {
        id: i.id.toString(),
        name: i.name,
      },
    });
  }

  for (let i of pencarianInvestor) {
    await prisma.masterPencarianInvestor.upsert({
      where: {
        id: i.id.toString(),
      },
      update: {
        id: i.id.toString(),
        name: i.name,
      },
      create: {
        id: i.id.toString(),
        name: i.name,
      },
    });
  }

  for (let i of pembagianDeviden) {
    await prisma.masterPembagianDeviden.upsert({
      where: {
        id: i.id.toString(),
      },
      update: {
        id: i.id.toString(),
        name: i.name,
      },
      create: {
        id: i.id.toString(),
        name: i.name,
      },
    });
  }

  for (let i of periodeDeviden) {
    await prisma.masterPeriodeDeviden.upsert({
      where: {
        id: i.id.toString(),
      },
      update: {
        id: i.id.toString(),
        name: i.name,
      },
      create: {
        id: i.id.toString(),
        name: i.name,
      },
    });
  }

  for (let i of statusInvestasi) {
    await prisma.masterStatusInvestasi.upsert({
      where: {
        id: i.id,
      },
      create: {
        id: i.id,
        name: i.name,
        color: i.color,
      },
      update: {
        id: i.id,
        name: i.name,
        color: i.color,
      },
    });
  }

  for (let i of namaBank) {
    await prisma.masterBank.upsert({
      where: {
        id: i.id.toString(),
      },
      create: {
        id: i.id.toString(),
        name: i.name,
        norek: i.norek.toString(),
      },
      update: {
        id: i.id.toString(),
        name: i.name,
        norek: i.norek.toString(),
      },
    });
  }

  for (let i of statusTransaksiInvestasi) {
    await prisma.masterStatusTransaksiInvestasi.upsert({
      where: {
        id: i.id,
      },
      create: {
        id: i.id,
        name: i.name,
        color: i.color,
      },
      update: {
        id: i.id,
        name: i.name,
        color: i.color,
      },
    });
  }

  for (let i of jenisProgres) {
    await prisma.masterProgresInvestasi.upsert({
      where: {
        id: i.id,
      },
      create: {
        id: i.id,
        name: i.name,
      },
      update: {
        name: i.name,
      },
    });
  }

  for (let d of donasi_status) {
    await prisma.donasiMaster_StatusDonasi.upsert({
      where: {
        id: d.id,
      },
      create: {
        id: d.id,
        name: d.name,
      },
      update: {
        name: d.name,
      },
    });
  }

  for (let d of donasi_kategori) {
    await prisma.donasiMaster_Kategori.upsert({
      where: {
        id: d.id,
      },
      create: {
        id: d.id,
        name: d.name,
      },
      update: {
        name: d.name,
      },
    });
  }

  for (let d of donasi_durasi) {
    await prisma.donasiMaster_Durasi.upsert({
      where: {
        id: d.id,
      },
      create: {
        id: d.id,
        name: d.name,
      },
      update: {
        name: d.name,
      },
    });
  }

  for (let i of donasi_namaBank) {
    await prisma.donasiMaster_Bank.upsert({
      where: {
        id: i.id,
      },
      create: {
        id: i.id,
        name: i.name,
        norek: i.norek,
      },
      update: {
        id: i.id,
        name: i.name,
        norek: i.norek,
      },
    });
  }

  for (let d of donasi_status_invoice) {
    await prisma.donasiMaster_StatusInvoice.upsert({
      where: {
        id: d.id,
      },
      create: {
        id: d.id,
        name: d.name,
      },
      update: {
        name: d.name,
      },
    });
  }

  for (let e of event_status) {
    await prisma.eventMaster_Status.upsert({
      where: {
        id: e.id,
      },
      create: {
        id: e.id,
        name: e.name,
      },
      update: {
        name: e.name,
      },
    });
  }

  for (let e of event_tipe_acara) {
    await prisma.eventMaster_TipeAcara.upsert({
      where: {
        id: e.id,
      },
      create: {
        id: e.id,
        name: e.name,
      },
      update: {
        name: e.name,
      },
    });
  }

  for (let v of voting_status) {
    await prisma.voting_Status.upsert({
      where: {
        id: v.id,
      },
      create: {
        id: v.id,
        name: v.name,
      },
      update: {
        name: v.name,
      },
    });
  }

  for (let m of master_status) {
    await prisma.masterStatus.upsert({
      where: {
        id: m.id,
      },
      create: {
        id: m.id,
        name: m.name,
      },
      update: {
        name: m.name,
      },
    });
  }

  for (let m of forum_kategori_report) {
    await prisma.forumMaster_KategoriReport.upsert({
      where: {
        id: m.id as number,
      },
      create: {
        title: m.title,
        deskripsi: m.deskripsi,
      },
      update: {
        title: m.title,
        deskripsi: m.deskripsi,
      },
    });
  }

  for (let s of forum_status_posting) {
    await prisma.forumMaster_StatusPosting.upsert({
      where: {
        id: s.id,
      },
      create: {
        status: s.status,
      },
      update: {
        status: s.status,
      },
    });
  }

  for (let p of collaboration_industri) {
    await prisma.projectCollaborationMaster_Industri.upsert({
      where: {
        id: p.id,
      },
      create: {
        name: p.name,
      },
      update: {
        name: p.name,
      },
    });
  }

  for (let p of collaboration_status) {
    await prisma.projectCollaborationMaster_Status.upsert({
      where: {
        id: p.id,
      },
      create: {
        name: p.name,
      },
      update: {
        name: p.name,
      },
    });
  }

  for (let a of nomor_admin) {
    await prisma.nomorAdmin.upsert({
      where: {
        id: a.id,
      },
      create: {
        id: a.id,
        nomor: a.nomor,
      },
      update: {
        id: a.id,
        nomor: a.nomor,
      },
    });
  }
})()
  .then(() => {
    console.log("success");
    process.exit(0);
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
