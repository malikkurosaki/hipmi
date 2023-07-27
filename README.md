# HIPMI Project

## Bip Production @ 27-07-2023

### Project

__Team__

- bagas
- lukman
- lia
- malik

### note 
1. panter module bisa mengikuti contoh
2. untuk commit beri keterangan lengkap dan jelas
    
    **PANTERN**
    1. Tag Commit (Commit Tag)
    2. Deskripsi (Description)
    3. Body
    4. Referensi Isu (Issue References)
    
    **CONTOH**
    ```txt
    feat: Tambahkan fitur kalkulator

    Deskripsi:
    - Menambahkan fungsi penambahan, pengurangan, perkalian, dan pembagian
    - Memperbolehkan pengguna untuk memasukkan dua angka dan melakukan operasi matematika

    Fixes #12
    ```

    **REFRENSI**

   1. **`fix`**: Digunakan untuk menandakan perbaikan bug atau masalah yang ada dalam kode.

   Contoh:
   ```
   fix: Perbaiki bug tampilan pada halaman profil

   Deskripsi:
   - Mengatasi masalah tampilan yang menyebabkan foto profil tumpang tindih dengan teks

   Fixes #55
   ```

   1. **`docs`**: Digunakan ketika melakukan perubahan pada dokumentasi proyek, seperti menambahkan atau mengedit komentar, README, atau file dokumentasi lainnya.

   Contoh:
   ```
   docs: Update README dengan panduan instalasi

   Deskripsi:
   - Menyediakan petunjuk langkah demi langkah tentang cara menginstal dan menjalankan proyek

   No Issue
   ```

   1. **`chore`**: Digunakan untuk komit yang berhubungan dengan pekerjaan rutin, seperti pembaruan dependensi, pengaturan konfigurasi, atau tugas administratif lainnya.

   Contoh:
   ```
   chore: Pembaruan versi library requests

   Deskripsi:
   - Memperbarui library requests ke versi terbaru untuk meningkatkan keamanan dan kinerja

   No Issue
   ```

   1. **`refactor`**: Digunakan ketika melakukan refaktorisasi kode, yaitu mengubah struktur atau tata letak kode tanpa mengubah perilaku yang terlihat dari luar.

   Contoh:
   ```
   refactor: Ubah struktur kode halaman detail produk

   Deskripsi:
   - Memisahkan logika tampilan dari logika bisnis untuk meningkatkan keterbacaan dan pemeliharaan kode

   No Issue
   ```

   1. **`test`**: Digunakan ketika melakukan perubahan atau penambahan tes atau skrip pengujian.

   Contoh:
   ```
   test: Tambahkan tes unit untuk fungsi kalkulator

   Deskripsi:
   - Menulis tes unit untuk memastikan fungsi kalkulator berjalan dengan benar

   No Issue
   ```

   1. **`style`**: Digunakan ketika melakukan perubahan pada tampilan atau gaya kode, tanpa mengubah logika atau perilaku program.

   Contoh:
   ```
   style: Atur tata letak tombol 'Masuk'

   Deskripsi:
   - Memperbaiki tampilan tombol 'Masuk' pada halaman login agar lebih serasi

   No Issue
   ```

   1. **`perf`**: Digunakan ketika melakukan perubahan untuk meningkatkan kinerja aplikasi atau mengoptimalkan kode.

   Contoh:
   ```
   perf: Optimalkan penggunaan sumber daya gambar

   Deskripsi:
   - Mengurangi ukuran gambar dan mengimplementasikan caching untuk mempercepat waktu muat halaman

   Fixes #102
   ```
3. lakukan push dengan tahapan yang benar jangan menggunakan `git add -A ` tapi sesuai yang diedit atau yang di create saja

    **REFRENSI**

   1. **`git status`**: Pertama, periksa status repositori menggunakan perintah `git status`. Ini akan memberikan daftar perubahan yang belum ditambahkan ke area staging (unstaged changes) dan perubahan yang telah ditambahkan ke area staging (changes to be committed).

   2. **`git add`**: Tambahkan perubahan ke area staging menggunakan perintah `git add`. Misalnya, jika Anda ingin menambahkan semua perubahan, gunakan `git add .`, atau jika ingin menambahkan file tertentu, gunakan `git add <nama_file>`.

   3. **`git commit`**: Setelah perubahan ditambahkan ke area staging, lakukan commit perubahan menggunakan perintah `git commit -m "pesan_commit"`. Pastikan pesan commit yang Anda cantumkan informatif dan jelas mengenai perubahan yang Anda lakukan.

   4. **`git pull`**: Sebelum melakukan `push`, disarankan untuk melakukan `git pull` terlebih dahulu untuk mengambil perubahan terbaru dari repositori pusat (remote repository) dan memastikan bahwa Anda bekerja di atas versi terbaru dari branch yang Anda gunakan.

   5. **`git push`**: Jika tidak ada konflik dengan versi terbaru dari repositori pusat, Anda dapat melakukan `push` perubahan Anda ke repositori menggunakan perintah `git push`. Pastikan Anda memiliki izin yang cukup untuk melakukan `push` ke branch yang sedang Anda kerjakan.

   6. **`git log`**: Setelah `push`, gunakan perintah `git log` untuk memeriksa daftar commit yang telah Anda lakukan. Ini memastikan bahwa perubahan Anda berhasil tercatat di repositori.

    *note*

    - single file 
    
        git add index.html
    - multi file

        git add file1.txt file2.js file3.css
    - dir atau folder

        git add assets/











