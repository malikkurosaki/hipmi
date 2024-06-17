import {PrismaClient} from '@prisma/client'
import bin, { bidangBisnis, masterDurasi, masterKategori, masterProgres, masterReport, masterStatus, masterStatusDonasi, masterStatusEvent, masterStatusInvoice, masterStatusVoting, masterTipeAcara, namaBank, pembagianDeviden, pencarianInvestor, periodeDeviden, statusInvestasi, statusTransaksiInvestasi, userRole, userSeeder } from "./../src/bin";
const prisma = new PrismaClient()

; (async () => {
    console.log("Start seeding ... user role");
    for (let i of userRole) {
        const data = await prisma.masterUserRole.upsert({
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

    console.log("Start seeding ... user");
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

    console.log("Start seeding ... bidang bisnis");
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

    console.log("Start seeding ... pencarian investor");
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

    console.log("Start seeding ... pembagian deviden");
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

    console.log("Start seeding ... periode deviden");
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

    console.log("Start seeding ... status investasi");
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

    console.log("Start seeding ... nama bank");
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

    console.log("Start seeding ... status transaksi investasi");
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

    console.log("Start seeding ... master progres investasi");
    for (let i of masterProgres) {
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

    console.log("Start seeding ... master status donasi");
    for (let d of masterStatusDonasi) {
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

    console.log("Start seeding ... master kategori");
    for (let d of masterKategori) {
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

    console.log("Start seeding ... master durasi");
    for (let d of masterDurasi) {
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

    console.log("Start seeding ... master bank");
    for (let i of bin.masterBank) {
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

    console.log("Start seeding ... master status invoice");
    for (let d of masterStatusInvoice) {
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

    console.log("Start seeding ... master tipe acara");
    for (let e of masterStatusEvent) {
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

    console.log("Start seeding ... master tipe acara");
    for (let e of masterTipeAcara) {
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

    console.log("Start seeding ... master status voting");
    for (let v of masterStatusVoting) {
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

    console.log("Start seeding ... master status");
    for (let m of masterStatus) {
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

    console.log("Start seeding ... master kategori report");
    for (let m of masterReport) {
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

    console.log("Start seeding ... master status forum");
    for (let s of bin.masterStatusForum) {
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

    console.log("Start seeding ... master status colab");
    for (let p of bin.masterIndustri) {
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

    console.log("Start seeding ... master status colab");
    for (let p of bin.masterStatusColab) {
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

    console.log("Start seeding ... nomor admin");
    for (let a of bin.nomorAdmin) {
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
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
    .finally(() => {
        prisma.$disconnect()
        console.log("finish")
        process.exit(0)

    })
