export const PSS_QUESTIONS = [
    {
      id: 1,
      question: "Dalam sebulan terakhir, seberapa sering Anda merasa kesal karena sesuatu yang terjadi secara tidak terduga?",
      options: [
        { value: 0, label: "Tidak Pernah" },
        { value: 1, label: "Hampir Tidak Pernah" },
        { value: 2, label: "Kadang-kadang" },
        { value: 3, label: "Cukup Sering" },
        { value: 4, label: "Sangat Sering" }
      ]
    },
    {
      id: 2,
      question: "Dalam sebulan terakhir, seberapa sering Anda merasa tidak dapat mengendalikan hal-hal penting dalam hidup Anda?",
      options: [
        { value: 0, label: "Tidak Pernah" },
        { value: 1, label: "Hampir Tidak Pernah" },
        { value: 2, label: "Kadang-kadang" },
        { value: 3, label: "Cukup Sering" },
        { value: 4, label: "Sangat Sering" }
      ]
    },
    {
      id: 3,
      question: "Dalam sebulan terakhir, seberapa sering Anda merasa gugup dan stres?",
      options: [
        { value: 0, label: "Tidak Pernah" },
        { value: 1, label: "Hampir Tidak Pernah" },
        { value: 2, label: "Kadang-kadang" },
        { value: 3, label: "Cukup Sering" },
        { value: 4, label: "Sangat Sering" }
      ]
    },
    {
      id: 4,
      question: "Dalam sebulan terakhir, seberapa sering Anda merasa yakin tentang kemampuan Anda dalam menangani masalah-masalah pribadi?",
      options: [
        { value: 4, label: "Tidak Pernah" },
        { value: 3, label: "Hampir Tidak Pernah" },
        { value: 2, label: "Kadang-kadang" },
        { value: 1, label: "Cukup Sering" },
        { value: 0, label: "Sangat Sering" }
      ]
    },
    {
      id: 5,
      question: "Dalam sebulan terakhir, seberapa sering Anda merasa bahwa segala sesuatu berjalan sesuai keinginan Anda?",
      options: [
        { value: 4, label: "Tidak Pernah" },
        { value: 3, label: "Hampir Tidak Pernah" },
        { value: 2, label: "Kadang-kadang" },
        { value: 1, label: "Cukup Sering" },
        { value: 0, label: "Sangat Sering" }
      ]
    }
  ];
  
  export const BDI_QUESTIONS = [
    {
      id: 1,
      question: "Bagaimana perasaan Anda tentang masa depan?",
      options: [
        { value: 0, label: "Saya optimis tentang masa depan" },
        { value: 1, label: "Saya merasa kurang optimis tentang masa depan" },
        { value: 2, label: "Saya merasa tidak ada yang bisa saya harapkan" },
        { value: 3, label: "Saya merasa masa depan tanpa harapan dan akan semakin buruk" }
      ]
    },
    {
      id: 2,
      question: "Bagaimana perasaan Anda tentang diri sendiri?",
      options: [
        { value: 0, label: "Saya tidak merasa kecewa terhadap diri sendiri" },
        { value: 1, label: "Saya kecewa dengan diri sendiri" },
        { value: 2, label: "Saya muak dengan diri sendiri" },
        { value: 3, label: "Saya membenci diri sendiri" }
      ]
    },
    {
      id: 3,
      question: "Bagaimana kualitas tidur Anda?",
      options: [
        { value: 0, label: "Saya bisa tidur seperti biasa" },
        { value: 1, label: "Tidur saya tidak sebaik biasanya" },
        { value: 2, label: "Saya bangun 1-2 jam lebih awal dan sulit tidur lagi" },
        { value: 3, label: "Saya bangun beberapa jam lebih awal dan tidak bisa tidur lagi" }
      ]
    },
    {
      id: 4,
      question: "Bagaimana dengan energi Anda?",
      options: [
        { value: 0, label: "Saya tidak lebih lelah dari biasanya" },
        { value: 1, label: "Saya lebih mudah lelah dari biasanya" },
        { value: 2, label: "Saya lelah melakukan apapun" },
        { value: 3, label: "Saya terlalu lelah untuk melakukan apapun" }
      ]
    },
    {
      id: 5,
      question: "Bagaimana dengan nafsu makan Anda?",
      options: [
        { value: 0, label: "Nafsu makan saya tidak berubah" },
        { value: 1, label: "Nafsu makan saya tidak sebaik biasanya" },
        { value: 2, label: "Nafsu makan saya jauh lebih buruk sekarang" },
        { value: 3, label: "Saya tidak memiliki nafsu makan sama sekali" }
      ]
    }
  ];
  
  export const calculatePSSScore = (answers: Record<number, number>) => {
    const totalScore = Object.values(answers).reduce((acc, curr) => acc + curr, 0);
    
    if (totalScore <= 13) return { level: "Rendah", message: "Tingkat stres Anda rendah" };
    if (totalScore <= 26) return { level: "Sedang", message: "Tingkat stres Anda sedang" };
    return { level: "Tinggi", message: "Tingkat stres Anda tinggi" };
  };
  
  export const calculateBDIScore = (answers: Record<number, number>) => {
    const totalScore = Object.values(answers).reduce((acc, curr) => acc + curr, 0);
    
    if (totalScore <= 10) return { level: "Normal", message: "Tidak ada indikasi depresi" };
    if (totalScore <= 16) return { level: "Ringan", message: "Indikasi depresi ringan" };
    if (totalScore <= 20) return { level: "Sedang", message: "Indikasi depresi sedang" };
    if (totalScore <= 30) return { level: "Cukup Berat", message: "Indikasi depresi cukup berat" };
    return { level: "Berat", message: "Indikasi depresi berat" };
  };