import { investasi_funGetProspekById } from "./get/fun_get_file_by_prospek_id";
import { investasi_funGetOneInvestasiById } from "./get/fun_get_one_investasi_by_id";
import { investasi_funGetTransaksiByUserId } from "./get/fun_get_all_transaksi_by_user_id";
import { investasi_funUploadBuktiTransferById } from "./upload/fun_upload_bukti_transfer";
import { investasi_funGetSuccessTransactionById } from "./get/fun_get_success_transaction_by_id";
import { investasi_funGetAllPublishByUserId } from "./get/fun_get_all_investasi_by_user_id";
import { investasi_funGetAllInvestasiNonPublishByUserId } from "./get/fun_get_all_investasi_non_publish_by_user_id";

// Get
export { investasi_funGetOneInvestasiById };
export { investasi_funGetProspekById };
export { investasi_funGetTransaksiByUserId };
export { investasi_funGetSuccessTransactionById };
export { investasi_funGetAllPublishByUserId };
export { investasi_funGetAllInvestasiNonPublishByUserId };

// Upload
export { investasi_funUploadBuktiTransferById };
