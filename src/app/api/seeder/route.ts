import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import userRole from "../../../bin/seeder/user_role.json";
import bidangBisnis from "../../../bin/seeder/bidang_bisnis.json";
import pencarianInvestor from "./../../../bin/seeder/investasi/pencarian_investor.json";
import periodeDeviden from "./../../../bin/seeder/investasi/periode_deviden.json";
import pembagianDeviden from "./../../../bin/seeder/investasi/pembagian_deviden.json";
import statusInvestasi from "./../../../bin/seeder/investasi/status_investasi.json";
import namaBank from "./../../../bin/seeder/investasi/nama_bank.json";
import statusTransaksiInvestasi from "./../../../bin/seeder/investasi/status_transaksi_investasi.json";
import jenisProgres from "../../../bin/seeder/investasi/master_progres.json";
import userSeeder from "../../../bin/seeder/user_seeder.json";
import donasi_status from "../../../bin/seeder/donasi/master_status.json";
import donasi_kategori from "../../../bin/seeder/donasi/master_kategori.json";
import donasi_durasi from "../../../bin/seeder/donasi/master_durasi.json";
import donasi_namaBank from "../../../bin/seeder/donasi/master_bank.json"
import donasi_status_invoice from "../../../bin/seeder/donasi/master_status_invoice.json"

export async function GET(req: Request) {
  const dev = new URL(req.url).searchParams.get("dev");
  if (dev === "DEV-HIPMI") {
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

    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ success: false });
}
