import AdminForum_Main from "./main/dashboard";
import AdminForum_TablePosting from "./sub_menu/table_posting";
import AdminForum_TableReportPosting from "./sub_menu/table_report_posting";
import AdminForum_DetailPosting from "./detail/detail_posting";
import AdminForum_HasilReportPosting from "./sub_detail/hasil_report_posting";
import AdminForum_HasilReportKomentar from "./sub_detail/hasil_report_komentar";

export {
  AdminForum_Main,
  AdminForum_TablePosting as AdminForum_TablePublish,
  AdminForum_TableReportPosting,
  AdminForum_DetailPosting as AdminForum_LihatSemuaKomentar,
  AdminForum_HasilReportPosting,
  AdminForum_HasilReportKomentar,
};
