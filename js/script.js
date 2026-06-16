document.addEventListener('DOMContentLoaded', function() {
    butonuGuncelle();
});

function dovizlariGuncelle() {
    if (!document.getElementById('fiyat-usd')) {
        return; 
    }
    
    try {
        fetch('https://api.exchangerate-api.com/v4/latest/TRY')
            .then(response => response.json())
            .then(dovizData => {
                try {
                    const usdRate = (1 / dovizData.rates.USD).toFixed(2);
                    const eurRate = (1 / dovizData.rates.EUR).toFixed(2);                                       
                    const usdOran = (Math.random() * 0.4 - 0.2).toFixed(2);
                    const eurOran = (Math.random() * 0.4 - 0.2).toFixed(2);                   
                    
                    if (document.getElementById('fiyat-usd')) {
                        document.getElementById('fiyat-usd').textContent = usdRate;
                        document.getElementById('fiyat-eur').textContent = eurRate;
                        document.getElementById('oran-usd').textContent = (usdOran >= 0 ? '▲' : '▼') + ' %' + Math.abs(usdOran);
                        document.getElementById('oran-eur').textContent = (eurOran >= 0 ? '▲' : '▼') + ' %' + Math.abs(eurOran);
                    }
                                       
                    altinFiyatlariniGuncelle(usdRate);
                    
                } catch (e) {
                    console.log('Döviz veri işleme hatası:', e);
                    dovizMockDataDoldur();
                    altinFiyatlariniMockDataOlaDoldur();
                }
            })
            .catch(error => {
                console.log('Döviz API hatası:', error);
                dovizMockDataDoldur();
                altinFiyatlariniMockDataOlaDoldur();
            });
    } catch (e) {
        console.log('Fetch hatası:', e);
    }
}

function altinFiyatlariniGuncelle(usdRate) {
    if (!document.getElementById('fiyat-gram')) {
        return;
    }
       
    const baseGramAltinTRY = 7000 + (Math.random() * 200 - 100); 
    const gramAltinTRY = baseGramAltinTRY.toFixed(2);        
    const ceyrekAltinTRY = (gramAltinTRY * 1.75).toFixed(2);
    const altinOranGram = (Math.random() * 0.6 - 0.3).toFixed(2);
    const altinOranCeyrek = (Math.random() * 0.6 - 0.3).toFixed(2);
       
    if (document.getElementById('fiyat-gram')) {
        document.getElementById('fiyat-gram').textContent = gramAltinTRY;
        document.getElementById('oran-gram').textContent = (altinOranGram >= 0 ? '▲' : '▼') + ' %' + Math.abs(altinOranGram);
        document.getElementById('fiyat-ceyrek').textContent = ceyrekAltinTRY;
        document.getElementById('oran-ceyrek').textContent = (altinOranCeyrek >= 0 ? '▲' : '▼') + ' %' + Math.abs(altinOranCeyrek);
        
        console.log('✅ Altın fiyatları güncellendi - Gram: ₺' + gramAltinTRY + ', Çeyrek: ₺' + ceyrekAltinTRY);
    }
}

function dovizMockDataDoldur() {
    if (document.getElementById('fiyat-usd')) {
        document.getElementById('fiyat-usd').textContent = '32.45';
        document.getElementById('fiyat-eur').textContent = '35.12';
        document.getElementById('oran-usd').textContent = '▲ %0.15';
        document.getElementById('oran-eur').textContent = '▼ %0.05';
    }
}

function altinFiyatlariniMockDataOlaDoldur() {
    if (document.getElementById('fiyat-gram')) {
        document.getElementById('fiyat-gram').textContent = '2.45';
        document.getElementById('fiyat-ceyrek').textContent = '18.37';
        document.getElementById('oran-gram').textContent = '▲ %0.40';
        document.getElementById('oran-ceyrek').textContent = '▲ %0.35';
        console.log('⚠️ Mock altın verileri kullanılıyor');
    }
}

document.addEventListener("DOMContentLoaded", function() {
    
    dovizlariGuncelle();
    
    setInterval(dovizlariGuncelle, 5000);
    
    const uyeGirisiButonu = document.querySelector('button[onclick*="giris.html"]');
    if (uyeGirisiButonu) {
        const aktifUye = localStorage.getItem('aktifUye');
        if (aktifUye) {            
            uyeGirisiButonu.textContent = '👤 Profil';
            uyeGirisiButonu.onclick = function() {
                window.location.href = 'profil.html';
            };
        } else {
            uyeGirisiButonu.onclick = function() {
                window.location.href = 'giris.html';
            };
        }
    }

    const form = document.getElementById("iletisimFormu");
    const uyariDivi = document.getElementById("formUyarisi");

    if (form) {
        form.addEventListener("submit", function(event) {            
            event.preventDefault();          
            const adSoyad = document.getElementById("adSoyad").value.trim();
            const mesaj = document.getElementById("mesaj").value.trim();

            if (adSoyad === "" || mesaj === "") {                
                uyariDivi.textContent = "Lütfen Ad Soyad ve Mesaj alanlarını boş bırakmayınız!";
                uyariDivi.className = "uyari-mesaji"; 
            } else {               
                uyariDivi.textContent = "Mesajınız başarıyla iletildi. Teşekkürler!";
                uyariDivi.className = "uyari-mesaji basarili-mesaji"; 
                form.reset(); 
            }
        });
    }
   
    const aramaCubugu = document.getElementById('arama-cubugu');
    if (aramaCubugu) {
        aramaCubugu.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                const arananKelime = aramaCubugu.value.trim();
                
                if (arananKelime === "") {
                    alert("Lütfen aramak istediğiniz kelimeyi giriniz.");
                } else {
                    alert("Arama özelliği şu an test aşamasındadır. Aranan: " + arananKelime);
                }
            }
        });
    }
});


function hesapla() {
    let tutar = parseFloat(document.getElementById('tutar').value);
    let vade = parseInt(document.getElementById('vade').value);

    if(tutar && tutar > 0) {    
        let aylikFaiz = 0.04;                
        let pay = aylikFaiz * Math.pow(1 + aylikFaiz, vade);
        let payda = Math.pow(1 + aylikFaiz, vade) - 1;
        let aylikTaksit = tutar * (pay / payda);
        
        let toplamGeriOdeme = aylikTaksit * vade;       
        document.getElementById('sonuc').innerText = "Aylık Taksit: " + aylikTaksit.toFixed(2) + " TL";
        document.getElementById('toplamOdeme').innerText = "Toplam Geri Ödeme: " + toplamGeriOdeme.toFixed(2) + " TL";
    } else {
        alert("Lütfen geçerli bir kredi tutarı giriniz.");
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const girisForm = document.getElementById("girisFormu");
    const girisUyarisi = document.getElementById("girisUyarisi");

    if (girisForm) {
        girisForm.addEventListener("submit", function(event) {
            event.preventDefault(); 

            const tcNo = document.getElementById("tcNo").value.trim();
            const sifre = document.getElementById("sifre").value.trim();

            if (tcNo === "" || sifre === "") {
                girisUyarisi.textContent = "Lütfen müşteri numaranızı ve şifrenizi giriniz.";
                girisUyarisi.className = "uyari-mesaji"; 
            } 
            else if (tcNo.length < 11) {
                girisUyarisi.textContent = "T.C. Kimlik numaranız 11 haneli olmalıdır.";
                girisUyarisi.className = "uyari-mesaji"; 
            }
            else {
                girisUyarisi.textContent = "Giriş başarılı! Güvenli sayfaya yönlendiriliyorsunuz...";
                girisUyarisi.className = "uyari-mesaji basarili-mesaji"; 
                               
                setTimeout(function() {
                    girisForm.reset();
                }, 2000);
            }
        });
    }
});

let slaytIndex = 0;
let slaytZamanlayici;

document.addEventListener("DOMContentLoaded", function() {    
    let sliderVarMi = document.querySelector(".slider-konteyner");
    if (sliderVarMi) {
        slaytlariGoster(slaytIndex);
        slaytZamanlayici = setInterval(function() { slaytDegistir(1) }, 5000);
    }
});

function slaytDegistir(n) {
    clearInterval(slaytZamanlayici); 
    slaytlariGoster(slaytIndex += n);
    slaytZamanlayici = setInterval(function() { slaytDegistir(1) }, 5000); 
}

function slaytaGit(n) {
    clearInterval(slaytZamanlayici);
    slaytlariGoster(slaytIndex = n);
    slaytZamanlayici = setInterval(function() { slaytDegistir(1) }, 5000);
}

function slaytlariGoster(n) {
    let i;
    let slaytlar = document.getElementsByClassName("slayt");
    let noktalar = document.getElementsByClassName("nokta");
    
    if (n >= slaytlar.length) {slaytIndex = 0}    
    if (n < 0) {slaytIndex = slaytlar.length - 1}
    
    for (i = 0; i < slaytlar.length; i++) {
        slaytlar[i].className = slaytlar[i].className.replace(" slayt-aktif", "");
    }
    for (i = 0; i < noktalar.length; i++) {
        noktalar[i].className = noktalar[i].className.replace(" nokta-aktif", "");
    }
    
    slaytlar[slaytIndex].className += " slayt-aktif";
    noktalar[slaytIndex].className += " nokta-aktif";
}
const subeVerileri = {
    eskisehir: [
        {
            ad: "Eskişehir Çarşı Şubesi",
            tur: "sube",
            adres: "İki Eylül Cad. No:45 Merkez / Eskişehir",
            telefon: "0222 230 00 00",
            lat: 39.7667,
            lon: 30.5256,
            calismaSaatleri: "09:00 - 18:00"
        },
        {
            ad: "Eskişehir Otogar ATM",
            tur: "atm",
            adres: "Şehirlerarası Otobüs Terminali İçi",
            telefon: "7/24 Hizmet",
            lat: 39.7750,
            lon: 30.5100,
            calismaSaatleri: "7/24"
        },
        {
            ad: "Anadolu Üniversitesi ATM",
            tur: "atm",
            adres: "Anadolu Üniversitesi Cuma Kapısı Yanı",
            telefon: "7/24 Hizmet",
            lat: 39.8050,
            lon: 30.5350,
            calismaSaatleri: "7/24"
        },
        {
            ad: "Sivrihisar Şubesi",
            tur: "sube",
            adres: "Yenice Mah. Ordu Cad. No:12 Sivrihisar",
            telefon: "0222 711 00 00",
            lat: 39.5667,
            lon: 30.2833,
            calismaSaatleri: "09:00 - 18:00"
        },
        {
            ad: "Sivrihisar Belediye ATM",
            tur: "atm",
            adres: "Belediye Binası Girişi Önü",
            telefon: "7/24 Hizmet",
            lat: 39.5650,
            lon: 30.2820,
            calismaSaatleri: "7/24"
        }
    ],
    istanbul: [
        {
            ad: "Levent Genel Müdürlük Şubesi",
            tur: "sube",
            adres: "Nispetiye Mah. Aytar Cad. No:2 Levent / İstanbul",
            telefon: "0212 318 00 00",
            lat: 41.0738,
            lon: 29.0255,
            calismaSaatleri: "09:00 - 18:00"
        },
        {
            ad: "Metrocity ATM",
            tur: "atm",
            adres: "Metrocity AVM Giriş Katı, Levent",
            telefon: "7/24 Hizmet",
            lat: 41.0750,
            lon: 29.0280,
            calismaSaatleri: "7/24"
        },
        {
            ad: "Taksim Şubesi",
            tur: "sube",
            adres: "İstiklal Cad. No:150 Taksim",
            telefon: "0212 245 50 50",
            lat: 41.0373,
            lon: 29.0286,
            calismaSaatleri: "09:00 - 18:00"
        },
        {
            ad: "Bakırköy ATM",
            tur: "atm",
            adres: "Bakırköy İş Merkezi",
            telefon: "7/24 Hizmet",
            lat: 40.9942,
            lon: 29.1583,
            calismaSaatleri: "7/24"
        }
    ],
    bursa: [
        {
            ad: "Bursa Heykel Şubesi",
            tur: "sube",
            adres: "Atatürk Cad. No:88 Osmangazi / Bursa",
            telefon: "0224 220 00 00",
            lat: 40.1947,
            lon: 29.1785,
            calismaSaatleri: "09:00 - 18:00"
        },
        {
            ad: "FSM Bulvarı ATM",
            tur: "atm",
            adres: "Fatih Sultan Mehmet Bulvarı No:12",
            telefon: "7/24 Hizmet",
            lat: 40.1900,
            lon: 29.1800,
            calismaSaatleri: "7/24"
        },
        {
            ad: "Nilüfer Şubesi",
            tur: "sube",
            adres: "Nilüfer AVM, Nilüfer / Bursa",
            telefon: "0224 285 00 00",
            lat: 40.2200,
            lon: 29.1900,
            calismaSaatleri: "09:00 - 18:00"
        }
    ]
};

function mesafeHesapla(lat1, lon1, lat2, lon2) {
    const R = 6371; // Dünya yarıçapı (km)
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const d = R * c;
    return d.toFixed(2);
}

function subeAramaYap() {
    const sehir = document.getElementById('subeSehir').value;
    const tur = document.getElementById('subeTur').value;    
    if (!sehir) {
        document.getElementById('subeSonuclari').innerHTML = '';
        return;
    }
    
    const subeler = subeVerileri[sehir] || [];
    let filtreliSubeler = subeler;
    if (tur) {
        filtreliSubeler = subeler.filter(s => s.tur === tur);
    }
    
    if (filtreliSubeler.length === 0) {
        document.getElementById('subeSonuclari').innerHTML = `
            <div class="sube-bos-sonuc">
                <div class="sube-bos-sonuc-icon">📭</div>
                <p>Seçilen kriterlere uygun sonuç bulunamadı.</p>
            </div>
        `;
        return;
    }
       
    subeGoster(filtreliSubeler);
}
function subeGoster(subeler) {
    const sonucDiv = document.getElementById('subeSonuclari');
    sonucDiv.innerHTML = '';
    
    subeler.forEach(sube => {
        const subeKarti = document.createElement('div');
        subeKarti.className = `sube-kart-yeni ${sube.tur}-tipi`;
        
        const turetiketi = sube.tur === 'sube' ? 'Şube' : 'ATM';
        const turikonu = sube.tur === 'sube' ? '🏢' : '🏧';
        
        subeKarti.innerHTML = `
            <div class="sube-kart-yeni-header">
                <h3 class="sube-kart-yeni-baslik">${turikonu} ${sube.ad}</h3>
                <span class="sube-kart-yeni-etiket ${sube.tur}">${turetiketi}</span>
            </div>
            
            <div class="sube-kart-yeni-bilgi">
                <span class="sube-kart-yeni-icon">📍</span>
                <span>${sube.adres}</span>
            </div>
            
            <div class="sube-kart-yeni-bilgi">
                <span class="sube-kart-yeni-icon">📞</span>
                <span>${sube.telefon}</span>
            </div>
            
            <div class="sube-kart-yeni-bilgi">
                <span class="sube-kart-yeni-icon">🕐</span>
                <span>${sube.calismaSaatleri}</span>
            </div>
        `;
        
        sonucDiv.appendChild(subeKarti);
    });
}

function yakindakiBul() {
    if (!navigator.geolocation) {
        alert("Tarayıcınız konum bilgisini desteklemiyor.");
        return;
    }
    
    navigator.geolocation.getCurrentPosition(function(position) {
        const userLat = position.coords.latitude;
        const userLon = position.coords.longitude;
        const tumSubeler = [];
        for (let sehir in subeVerileri) {
            tumSubeler.push(...subeVerileri[sehir]);
        }       
        tumSubeler.forEach(sube => {
            sube.mesafe = parseFloat(mesafeHesapla(userLat, userLon, sube.lat, sube.lon));
        });      
        const enYakinlar = tumSubeler
            .sort((a, b) => a.mesafe - b.mesafe)
            .slice(0, 5);
               
        subeGosterMesafeile(enYakinlar);
        
    }, function(error) {
        alert("Konum alınamadı. Lütfen tarayıcı ayarlarınızı kontrol edin.");
    });
}

function subeGosterMesafeile(subeler) {
    const sonucDiv = document.getElementById('subeSonuclari');
    sonucDiv.innerHTML = '<h3 style="text-align: center; margin-bottom: 20px; color: #00a859;">✅ Konumunuza En Yakın 5 Şube</h3>';
    
    subeler.forEach((sube, index) => {
        const subeKarti = document.createElement('div');
        subeKarti.className = `sube-kart-yeni ${sube.tur}-tipi`;
        
        const turetiketi = sube.tur === 'sube' ? 'Şube' : 'ATM';
        const turikonu = sube.tur === 'sube' ? '🏢' : '🏧';
        
        subeKarti.innerHTML = `
            <div class="sube-kart-yeni-header">
                <h3 class="sube-kart-yeni-baslik">${index + 1}. ${turikonu} ${sube.ad}</h3>
                <span class="sube-kart-yeni-etiket ${sube.tur}">${turetiketi}</span>
            </div>
            
            <div class="sube-kart-yeni-bilgi">
                <span class="sube-kart-yeni-icon">📍</span>
                <span>${sube.adres}</span>
            </div>
            
            <div class="sube-kart-yeni-bilgi">
                <span class="sube-kart-yeni-icon">📞</span>
                <span>${sube.telefon}</span>
            </div>
            
            <div class="sube-kart-yeni-bilgi">
                <span class="sube-kart-yeni-icon">🕐</span>
                <span>${sube.calismaSaatleri}</span>
            </div>
            
            <div class="sube-kart-yeni-mesafe">
                <div class="sube-kart-yeni-mesafe-deger">${sube.mesafe} km</div>
                <div class="sube-kart-yeni-mesafe-metin">Uzaklığı</div>
            </div>
        `;
        
        sonucDiv.appendChild(subeKarti);
    });
}

function uyeGirisiDurumuKontrol() {
    const aktifUye = localStorage.getItem('aktifUye');
    if (aktifUye) {
        window.location.href = 'profil.html';
    } else {
        window.location.href = 'giris.html';
    }
}
function butonuGuncelle() {
    const buton = document.getElementById('btn-uye-girisi');
    if (buton) {
        const aktifUye = localStorage.getItem('aktifUye');
        if (aktifUye) {
            buton.textContent = 'Profil';
        } else {
            buton.textContent = 'Üye Girişi';
        }
    }
}

function sekmeDegistir(event, sekmeAdi) {
    event.preventDefault();
    
    const sekmeler = document.querySelectorAll('.sekme-icerik');
    sekmeler.forEach(s => s.classList.remove('aktif'));
    
    document.getElementById(sekmeAdi).classList.add('aktif');
    
    const butonlar = document.querySelectorAll('.sekme-buton');
    butonlar.forEach(b => b.classList.remove('aktif'));
    event.target.classList.add('aktif');
}
function profilSekmeDegistir(event, sekmeAdi) {
    event.preventDefault();
    
    const sekmeler = document.querySelectorAll('.profil-sekme-icerik');
    sekmeler.forEach(s => s.classList.remove('aktif'));
    
    document.getElementById(sekmeAdi).classList.add('aktif');
    
    const butonlar = document.querySelectorAll('.profil-sekme-buton');
    butonlar.forEach(b => b.classList.remove('aktif'));
    event.target.classList.add('aktif');
}
document.addEventListener("DOMContentLoaded", function() {
    const kayitForm = document.getElementById("kayitFormu");
    const kayitUyarisi = document.getElementById("kayitUyarisi");
    
    if (kayitForm) {
        kayitForm.addEventListener("submit", function(event) {
            event.preventDefault();
            
            const tcNo = document.getElementById("kayitTCNo").value.trim();
            const adSoyad = document.getElementById("kayitAdSoyad").value.trim();
            const email = document.getElementById("kayitEmail").value.trim();
            const telefon = document.getElementById("kayitTelefon").value.trim();
            const sifre = document.getElementById("kayitSifre").value.trim();
            const sifreOnay = document.getElementById("kayitSifreOnay").value.trim();
            
            if (!tcNo || !adSoyad || !email || !telefon || !sifre || !sifreOnay) {
                kayitUyarisi.textContent = "Lütfen tüm alanları doldurunuz.";
                kayitUyarisi.className = "uyari-mesaji";
                return;
            }
            
            if (tcNo.length !== 11 || isNaN(tcNo)) {
                kayitUyarisi.textContent = "T.C. Kimlik numarası 11 haneli olmalıdır.";
                kayitUyarisi.className = "uyari-mesaji";
                return;
            }
            
            if (!email.includes("@")) {
                kayitUyarisi.textContent = "Geçerli bir e-posta adresi giriniz.";
                kayitUyarisi.className = "uyari-mesaji";
                return;
            }
            
            if (sifre.length < 6) {
                kayitUyarisi.textContent = "Şifre en az 6 karakter olmalıdır.";
                kayitUyarisi.className = "uyari-mesaji";
                return;
            }
            
            if (sifre !== sifreOnay) {
                kayitUyarisi.textContent = "Şifreler eşleşmiyor.";
                kayitUyarisi.className = "uyari-mesaji";
                return;
            }
            const yeniUye = {
                tcNo: tcNo,
                adSoyad: adSoyad,
                email: email,
                telefon: telefon,
                sifre: sifre,
                bakiye: (Math.random() * 50000 + 5000).toFixed(2),
                tarih: new Date().toLocaleDateString('tr-TR')
            };
            let uyeler = JSON.parse(localStorage.getItem('garantiUyeleri')) || [];
            uyeler.push(yeniUye);
            localStorage.setItem('garantiUyeleri', JSON.stringify(uyeler));
            
            kayitUyarisi.textContent = "Üyelik başarılı! Yönlendiriliyorsunuz...";
            kayitUyarisi.className = "uyari-mesaji basarili-mesaji";
            
            setTimeout(function() {
                // Otomatik olarak giriş sekmesine dön ve giriş yap
                document.getElementById('tcNo').value = tcNo;
                document.getElementById('sifre').value = sifre;
                document.getElementById('girisFormu').submit();
            }, 2000);
        });
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const girisForm = document.getElementById("girisFormu");
    const girisUyarisi = document.getElementById("girisUyarisi");
    
    if (girisForm) {
        girisForm.addEventListener("submit", function(event) {
            event.preventDefault();
            
            const tcNo = document.getElementById("tcNo").value.trim();
            const sifre = document.getElementById("sifre").value.trim();
            
            if (tcNo === "" || sifre === "") {
                girisUyarisi.textContent = "Lütfen müşteri numaranızı ve şifrenizi giriniz.";
                girisUyarisi.className = "uyari-mesaji";
                return;
            }
            
            if (tcNo.length < 11) {
                girisUyarisi.textContent = "T.C. Kimlik numaranız 11 haneli olmalıdır.";
                girisUyarisi.className = "uyari-mesaji";
                return;
            }
            
            let uyeler = JSON.parse(localStorage.getItem('garantiUyeleri')) || [];
            const uyeKontrol = uyeler.find(u => u.tcNo === tcNo && u.sifre === sifre);
            
            if (!uyeKontrol) {
                girisUyarisi.textContent = "Müşteri numarası veya şifre hatalı.";
                girisUyarisi.className = "uyari-mesaji";
                return;
            }
            
            localStorage.setItem('aktifUye', JSON.stringify(uyeKontrol));
            girisUyarisi.textContent = "Giriş başarılı! Profil sayfasına yönlendiriliyorsunuz...";
            girisUyarisi.className = "uyari-mesaji basarili-mesaji";
            
            setTimeout(function() {
                window.location.href = 'profil.html';
            }, 1500);
        });
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const aktifUye = JSON.parse(localStorage.getItem('aktifUye'));
    
    if (!aktifUye && document.body.innerHTML.includes('profil-ana')) {
        // Profil sayfasında ama giriş yapılmamış
        alert("Lütfen önce giriş yapınız.");
        window.location.href = 'giris.html';
        return;
    }
    
    if (aktifUye && document.getElementById('profil-adSoyad')) {
        document.getElementById('profil-adSoyad').textContent = aktifUye.adSoyad;
        document.getElementById('profil-tcNo').textContent = aktifUye.tcNo;
        
        document.getElementById('bilgi-tcNo').textContent = aktifUye.tcNo;
        document.getElementById('bilgi-adSoyad').textContent = aktifUye.adSoyad;
        document.getElementById('bilgi-email').textContent = aktifUye.email;
        document.getElementById('bilgi-telefon').textContent = aktifUye.telefon;
        document.getElementById('bilgi-tarih').textContent = aktifUye.tarih;
        
        // Hesap bilgileri
        document.getElementById('profil-bakiye').textContent = '₺' + parseFloat(aktifUye.bakiye).toLocaleString('tr-TR', { minimumFractionDigits: 2 });
        document.getElementById('profil-harcama').textContent = '₺' + (Math.random() * 5000).toFixed(2).replace('.', ',');
        document.getElementById('profil-limit').textContent = '₺' + (50000 - parseFloat(aktifUye.bakiye)).toFixed(2).replace('.', ',');

        profilIslemlerYukle();
        const sifreForm = document.getElementById("sifreFormunu");
        if (sifreForm) {
            sifreForm.addEventListener("submit", function(event) {
                event.preventDefault();
                sifreGuncelle(aktifUye);
            });
        }
    }
});

function sifreGuncelle(aktifUye) {
    const eskiSifre = document.getElementById("eskiSifre").value.trim();
    const yeniSifre = document.getElementById("yeniSifre").value.trim();
    const yeniSifreOnay = document.getElementById("yeniSifreOnay").value.trim();
    const sifreUyarisi = document.getElementById("sifreUyarisi");
    
    if (eskiSifre === "" || yeniSifre === "" || yeniSifreOnay === "") {
        sifreUyarisi.textContent = "Lütfen tüm alanları doldurunuz.";
        sifreUyarisi.className = "uyari-mesaji";
        return;
    }
    
    if (eskiSifre !== aktifUye.sifre) {
        sifreUyarisi.textContent = "Mevcut şifre yanlış.";
        sifreUyarisi.className = "uyari-mesaji";
        return;
    }
    
    if (yeniSifre.length < 6) {
        sifreUyarisi.textContent = "Yeni şifre en az 6 karakter olmalıdır.";
        sifreUyarisi.className = "uyari-mesaji";
        return;
    }
    
    if (yeniSifre !== yeniSifreOnay) {
        sifreUyarisi.textContent = "Yeni şifreler eşleşmiyor.";
        sifreUyarisi.className = "uyari-mesaji";
        return;
    }
    
    aktifUye.sifre = yeniSifre;
    
    let uyeler = JSON.parse(localStorage.getItem('garantiUyeleri')) || [];
    uyeler = uyeler.map(u => u.tcNo === aktifUye.tcNo ? aktifUye : u);
    localStorage.setItem('garantiUyeleri', JSON.stringify(uyeler));
    localStorage.setItem('aktifUye', JSON.stringify(aktifUye));
    
    sifreUyarisi.textContent = "Şifreniz başarıyla değiştirildi.";
    sifreUyarisi.className = "uyari-mesaji basarili-mesaji";
    
    document.getElementById("sifreFormunu").reset();
}

function bilgiGuncelle(alanAdi) {
    const yeniDeger = document.getElementById('input-' + alanAdi).value.trim();
    const aktifUye = JSON.parse(localStorage.getItem('aktifUye'));
    
    if (!yeniDeger) {
        alert("Lütfen boş bırakmayınız.");
        return;
    }
    
    if (alanAdi === 'adSoyad') {
        aktifUye.adSoyad = yeniDeger;
        document.getElementById('profil-adSoyad').textContent = yeniDeger;
        document.getElementById('bilgi-adSoyad').textContent = yeniDeger;
    } else if (alanAdi === 'email') {
        aktifUye.email = yeniDeger;
        document.getElementById('bilgi-email').textContent = yeniDeger;
    } else if (alanAdi === 'telefon') {
        aktifUye.telefon = yeniDeger;
        document.getElementById('bilgi-telefon').textContent = yeniDeger;
    }
    
    let uyeler = JSON.parse(localStorage.getItem('garantiUyeleri')) || [];
    uyeler = uyeler.map(u => u.tcNo === aktifUye.tcNo ? aktifUye : u);
    localStorage.setItem('garantiUyeleri', JSON.stringify(uyeler));
    localStorage.setItem('aktifUye', JSON.stringify(aktifUye));
    
    formAcKapat(null, alanAdi);
    alert("Bilgileriniz başarıyla güncellendi.");
}

function formAcKapat(secenek, alanAdi) {
    const form = document.getElementById('form-' + alanAdi);
    const input = document.getElementById('input-' + alanAdi);
    
    if (form.classList.contains('form-alan-gizli')) {
        form.classList.remove('form-alan-gizli');
        if (input) {
            if (alanAdi === 'adSoyad') {
                input.value = document.getElementById('bilgi-adSoyad').textContent;
            } else if (alanAdi === 'email') {
                input.value = document.getElementById('bilgi-email').textContent;
            } else if (alanAdi === 'telefon') {
                input.value = document.getElementById('bilgi-telefon').textContent;
            }
            input.focus();
        }
    } else {
        form.classList.add('form-alan-gizli');
    }
}

function profilCikis() {
    if (confirm("Çıkmak istediğinize emin misiniz?")) {
        localStorage.removeItem('aktifUye');
        window.location.href = 'index.html';
    }
}

function profilIslemlerYukle() {
    const islemler = [
        { tarih: '16 Haziran 2026', tur: 'Maaş Transferi', tutar: '+₺5.500,00' },
        { tarih: '15 Haziran 2026', tur: 'Su Faturası Ödemesi', tutar: '-₺125,50' },
        { tarih: '14 Haziran 2026', tur: 'Elektrik Faturası Ödemesi', tutar: '-₺310,00' },
        { tarih: '13 Haziran 2026', tur: 'Alışveriş (Market)', tutar: '-₺256,75' },
        { tarih: '12 Haziran 2026', tur: 'Kredi Geri Ödemesi', tutar: '-₺2.000,00' }
    ];
    
    const tablo = document.getElementById('islemler-tablo');
    if (tablo) {
        tablo.innerHTML = '';
        islemler.forEach(islem => {
            tablo.innerHTML += `
                <tr style="border-bottom: 1px solid #ddd;">
                    <td style="padding: 12px;">${islem.tarih}</td>
                    <td style="padding: 12px;">${islem.tur}</td>
                    <td style="padding: 12px; text-align: right; font-weight: 600; color: ${islem.tutar.includes('-') ? '#d9534f' : '#00a859'}">${islem.tutar}</td>
                </tr>
            `;
        });
    }
}