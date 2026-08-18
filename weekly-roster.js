(function () {
  const config = window.WEEKLY_ROSTER;
  const mount = document.querySelector("#weekly-roster-announcement");
  if (!config || !mount) return;

  const words = {
    en: { eyebrow:"WEEKLY ANNOUNCEMENT", title:"This week’s roster", intro:"Select a day, then choose a team member to view her profile.", days:["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"], note:"Roster may change. Please contact the studio to confirm availability.", nationality:"Nationality",height:"Height",weight:"Weight",age:"Age",cup:"Cup" },
    zh: { eyebrow:"每周公告", title:"本周排班", intro:"选择日期，再选择工作人员查看个人资料。", days:["星期一","星期二","星期三","星期四","星期五","星期六","星期日"], note:"排班可能调整，请联系店内确认当天安排。",nationality:"国籍",height:"身高",weight:"体重",age:"年龄",cup:"罩杯" },
    vi: { eyebrow:"THÔNG BÁO HẰNG TUẦN", title:"Lịch làm việc tuần này", intro:"Chọn ngày, sau đó chọn một thành viên để xem hồ sơ.", days:["Thứ Hai","Thứ Ba","Thứ Tư","Thứ Năm","Thứ Sáu","Thứ Bảy","Chủ Nhật"], note:"Lịch có thể thay đổi. Vui lòng liên hệ studio để xác nhận.",nationality:"Quốc tịch",height:"Chiều cao",weight:"Cân nặng",age:"Tuổi",cup:"Cúp" },
    ar: { eyebrow:"الإعلان الأسبوعي", title:"جدول هذا الأسبوع", intro:"اختر يوماً ثم اختر إحدى الموظفات لعرض ملفها.", days:["الاثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت","الأحد"], note:"قد يتغير الجدول. يرجى التواصل مع الاستوديو للتأكيد.",nationality:"الجنسية",height:"الطول",weight:"الوزن",age:"العمر",cup:"المقاس" },
    ja: { eyebrow:"週間のお知らせ", title:"今週の出勤表", intro:"曜日を選び、スタッフを選択してプロフィールをご覧ください。", days:["月曜日","火曜日","水曜日","木曜日","金曜日","土曜日","日曜日"], note:"出勤予定は変更になる場合があります。事前に店舗へお問い合わせください。",nationality:"国籍",height:"身長",weight:"体重",age:"年齢",cup:"カップ" },
    ko: { eyebrow:"주간 안내", title:"이번 주 근무표", intro:"요일을 선택한 뒤 직원을 선택해 프로필을 확인하세요.", days:["월요일","화요일","수요일","목요일","금요일","토요일","일요일"], note:"근무 일정은 변경될 수 있으니 매장에 문의해 주세요.",nationality:"국적",height:"키",weight:"체중",age:"나이",cup:"컵" }
  };
  const dayKeys = Object.keys(config.days);
  const weekdayKeys = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
  const currentSydneyDay = () => {
    const weekday = new Intl.DateTimeFormat("en-AU", {
      timeZone: "Australia/Sydney",
      weekday: "long"
    }).format(new Date()).toLowerCase();
    return dayKeys.includes(weekday) ? weekday : (weekdayKeys[new Date().getDay()] || dayKeys[0]);
  };
  let selectedDay = currentSydneyDay();
  let automaticDay = selectedDay;
  let selectedPersonIndex = 0;
  const descriptions = {
    zh:{"New young Chinese team member":"新来的年轻华人工作人员","New tall and slim Thai team member":"新来的高挑泰国工作人员","Adorable Chinese team member":"亲切可爱的华人工作人员","Excellent Chinese massage practitioner":"优秀的华人按摩师","Confident and friendly Chinese team member":"自信友善的华人工作人员","Excellent Chinese team member":"优秀的华人工作人员","Fun cosplay-loving Japanese team member":"活泼、喜欢角色扮演的日本工作人员","Cute Filipino team member":"可爱的菲律宾工作人员","Gorgeous Brazilian team member":"亮眼的巴西工作人员","Attractive Chinese beauty":"有魅力的华人工作人员","Lovely Korean beauty":"亲切可爱的韩国工作人员","Glamorous Singaporean team member":"亮眼的新加坡工作人员","Friendly Thai team member":"友善的泰国工作人员","Curvy Chinese team member":"曲线优美的华人工作人员","Stunning Singaporean team member":"亮眼的新加坡工作人员","Tall and gorgeous Chinese team member":"高挑亮眼的华人工作人员","Charming Korean team member":"迷人的韩国工作人员","Blonde, blue-eyed Australian team member":"金发蓝眼的澳洲工作人员","University student":"大学生","Fresh-faced Japanese beauty":"清新自然的日本工作人员","Tall young Chinese beauty":"高挑年轻的华人工作人员","Sweet and fresh student style":"甜美清新的学生风格","Highly skilled massage practitioner":"技术熟练的按摩师","Tall, stunning Chinese beauty":"高挑亮眼的华人工作人员","Playful Vietnamese team member":"活泼的越南工作人员"},
    vi:{"New young Chinese team member":"Thành viên trẻ người Trung Quốc mới","New tall and slim Thai team member":"Thành viên Thái Lan mới, cao và thanh mảnh","Adorable Chinese team member":"Thành viên Trung Quốc đáng mến","Excellent Chinese massage practitioner":"Kỹ thuật viên massage Trung Quốc xuất sắc","Confident and friendly Chinese team member":"Thành viên Trung Quốc tự tin, thân thiện","Excellent Chinese team member":"Thành viên Trung Quốc xuất sắc","Fun cosplay-loving Japanese team member":"Thành viên Nhật Bản vui vẻ, yêu thích cosplay","Cute Filipino team member":"Thành viên Philippines dễ thương","Gorgeous Brazilian team member":"Thành viên Brazil nổi bật","Attractive Chinese beauty":"Thành viên Trung Quốc cuốn hút","Lovely Korean beauty":"Thành viên Hàn Quốc đáng mến","Glamorous Singaporean team member":"Thành viên Singapore quyến rũ","Friendly Thai team member":"Thành viên Thái Lan thân thiện","Curvy Chinese team member":"Thành viên Trung Quốc duyên dáng","Stunning Singaporean team member":"Thành viên Singapore nổi bật","Tall and gorgeous Chinese team member":"Thành viên Trung Quốc cao và nổi bật","Charming Korean team member":"Thành viên Hàn Quốc duyên dáng","Blonde, blue-eyed Australian team member":"Thành viên Úc tóc vàng, mắt xanh","University student":"Sinh viên đại học","Fresh-faced Japanese beauty":"Thành viên Nhật Bản trẻ trung","Tall young Chinese beauty":"Thành viên Trung Quốc trẻ, cao","Sweet and fresh student style":"Phong cách sinh viên ngọt ngào, tươi trẻ","Highly skilled massage practitioner":"Kỹ thuật viên massage tay nghề cao","Tall, stunning Chinese beauty":"Thành viên Trung Quốc cao và nổi bật","Playful Vietnamese team member":"Thành viên Việt Nam vui vẻ"},
    ja:{"New young Chinese team member":"新人の若い中国人スタッフ","New tall and slim Thai team member":"新人の長身でスリムなタイ人スタッフ","Adorable Chinese team member":"親しみやすい中国人スタッフ","Excellent Chinese massage practitioner":"技術力の高い中国人マッサージスタッフ","Confident and friendly Chinese team member":"明るく親切な中国人スタッフ","Excellent Chinese team member":"優秀な中国人スタッフ","Fun cosplay-loving Japanese team member":"コスプレ好きで楽しい日本人スタッフ","Cute Filipino team member":"可愛らしいフィリピン人スタッフ","Gorgeous Brazilian team member":"華やかなブラジル人スタッフ","Attractive Chinese beauty":"魅力的な中国人スタッフ","Lovely Korean beauty":"親しみやすい韓国人スタッフ","Glamorous Singaporean team member":"華やかなシンガポール人スタッフ","Friendly Thai team member":"親切なタイ人スタッフ","Curvy Chinese team member":"魅力的な中国人スタッフ","Stunning Singaporean team member":"印象的なシンガポール人スタッフ","Tall and gorgeous Chinese team member":"長身で華やかな中国人スタッフ","Charming Korean team member":"魅力的な韓国人スタッフ","Blonde, blue-eyed Australian team member":"金髪碧眼のオーストラリア人スタッフ","University student":"大学生","Fresh-faced Japanese beauty":"フレッシュな日本人スタッフ","Tall young Chinese beauty":"長身で若い中国人スタッフ","Sweet and fresh student style":"可愛らしく爽やかな学生風","Highly skilled massage practitioner":"高い技術を持つマッサージスタッフ","Tall, stunning Chinese beauty":"長身で印象的な中国人スタッフ","Playful Vietnamese team member":"明るいベトナム人スタッフ"},
    ko:{"New young Chinese team member":"새로 합류한 젊은 중국인 직원","New tall and slim Thai team member":"새로 합류한 키 크고 슬림한 태국인 직원","Adorable Chinese team member":"사랑스러운 중국인 직원","Excellent Chinese massage practitioner":"실력이 뛰어난 중국인 마사지 직원","Confident and friendly Chinese team member":"자신감 있고 친절한 중국인 직원","Excellent Chinese team member":"뛰어난 중국인 직원","Fun cosplay-loving Japanese team member":"코스프레를 좋아하는 유쾌한 일본인 직원","Cute Filipino team member":"귀여운 필리핀인 직원","Gorgeous Brazilian team member":"화려한 브라질인 직원","Attractive Chinese beauty":"매력적인 중국인 직원","Lovely Korean beauty":"사랑스러운 한국인 직원","Glamorous Singaporean team member":"화려한 싱가포르인 직원","Friendly Thai team member":"친절한 태국인 직원","Curvy Chinese team member":"매력적인 중국인 직원","Stunning Singaporean team member":"눈에 띄는 싱가포르인 직원","Tall and gorgeous Chinese team member":"키 크고 화려한 중국인 직원","Charming Korean team member":"매력적인 한국인 직원","Blonde, blue-eyed Australian team member":"금발과 파란 눈의 호주인 직원","University student":"대학생","Fresh-faced Japanese beauty":"풋풋한 일본인 직원","Tall young Chinese beauty":"키 크고 젊은 중국인 직원","Sweet and fresh student style":"달콤하고 산뜻한 학생 스타일","Highly skilled massage practitioner":"숙련된 마사지 직원","Tall, stunning Chinese beauty":"키 크고 눈에 띄는 중국인 직원","Playful Vietnamese team member":"발랄한 베트남인 직원"}
  };
  descriptions.zh["Friendly Chinese team member"]="友善的华人工作人员";
  descriptions.vi["Friendly Chinese team member"]="Thành viên Trung Quốc thân thiện";
  descriptions.ja["Friendly Chinese team member"]="親切な中国人スタッフ";
  descriptions.ko["Friendly Chinese team member"]="친절한 중국인 직원";
  descriptions.ar={"New young Chinese team member":"موظفة صينية شابة وجديدة","New tall and slim Thai team member":"موظفة تايلاندية جديدة طويلة ورشيقة","Adorable Chinese team member":"موظفة صينية لطيفة","Excellent Chinese massage practitioner":"مختصة تدليك صينية ممتازة","Confident and friendly Chinese team member":"موظفة صينية ودودة وواثقة","Friendly Chinese team member":"موظفة صينية ودودة"};
  const nationalityNames={
    zh:{Chinese:"中国",Thai:"泰国"},vi:{Chinese:"Trung Quốc",Thai:"Thái Lan"},ar:{Chinese:"الصين",Thai:"تايلاند"},ja:{Chinese:"中国",Thai:"タイ"},ko:{Chinese:"중국",Thai:"태국"}
  };

  function language() {
    const saved = localStorage.getItem("239-language") || "en";
    return words[saved] ? saved : "en";
  }

  function render() {
    const lang = language();
    const t = words[lang];
    const people = config.days[selectedDay] || [];
    const selectedPerson = people[selectedPersonIndex] || people[0];
    const selectedDescription = selectedPerson ? (descriptions[lang]?.[selectedPerson.description] || selectedPerson.description) : "";
    const selectedNationality = selectedPerson?.nationality ? (nationalityNames[lang]?.[selectedPerson.nationality] || selectedPerson.nationality) : "";
    const selectedDetails = selectedPerson ? [
      selectedPerson.role && [t.role || "Role",selectedPerson.role],
      selectedPerson.hours && [t.profile || "Profile",selectedPerson.hours],
      selectedPerson.nationality && [t.nationality,selectedNationality],
      selectedPerson.height && [t.height,selectedPerson.height],
      selectedPerson.weight && [t.weight,selectedPerson.weight],
      selectedPerson.age && [t.age,`${selectedPerson.age}`],
      selectedPerson.cup && [t.cup,selectedPerson.cup]
    ].filter(Boolean) : [];
    mount.innerHTML = `
      <div class="weekly-roster-content">
        <span class="eyebrow">${t.eyebrow}</span>
        <h2>${t.title} <em>${config.dateRange}</em></h2>
        <p>${config.address}<br>${t.intro}</p>
        <div class="weekly-day-tabs" role="tablist" aria-label="${t.title}">
          ${dayKeys.map((day, index) => `<button type="button" role="tab" data-weekly-day="${day}" aria-selected="${day === selectedDay}">${t.days[index]}</button>`).join("")}
        </div>
        <div class="weekly-roster-showcase">
          ${selectedPerson ? `<article class="weekly-featured-person">
            <div class="weekly-featured-photo weekly-hover-photo" data-original-src="${selectedPerson.image}" data-hover-images='${JSON.stringify(selectedPerson.hoverImages || window.get239HoverImages?.(selectedPerson) || [])}'><img src="${selectedPerson.image}" alt="${selectedPerson.name}" loading="eager"><span class="weekly-hover-hint">Hover · 2s</span></div>
            <div class="weekly-featured-info"><span>${t.days[dayKeys.indexOf(selectedDay)]}</span><h3>${selectedPerson.name}</h3><p>${selectedDescription}</p>${selectedDetails.length ? `<dl>${selectedDetails.map(([label,value])=>`<div><dt>${label}</dt><dd>${value}</dd></div>`).join("")}</dl>` : ""}</div>
          </article>` : ""}
          <div class="weekly-people" aria-label="${t.days[dayKeys.indexOf(selectedDay)]}">
            ${people.map((person,index) => {
              const nationality = person.nationality ? (nationalityNames[lang]?.[person.nationality] || person.nationality) : "";
              return `<button type="button" class="weekly-person-button" data-person-index="${index}" aria-pressed="${index===selectedPersonIndex}"><span class="weekly-thumb-hover" data-original-src="${person.image}" data-hover-images='${JSON.stringify(person.hoverImages || window.get239HoverImages?.(person) || [])}'><img src="${person.image}" alt="" loading="lazy"></span><span><strong>${person.name}</strong><small>${nationality || person.hours || person.role || (descriptions[lang]?.[person.description] || person.description || "")}</small>${person.role ? `<em>${person.role}</em>` : ""}</span></button>`;
            }).join("")}
          </div>
        </div>
        <small class="weekly-note">${t.note}</small>
      </div>`;
    mount.querySelectorAll("[data-weekly-day]").forEach(button => button.addEventListener("click", () => { selectedDay = button.dataset.weeklyDay; selectedPersonIndex = 0; render(); }));
    mount.querySelectorAll("[data-person-index]").forEach(button => button.addEventListener("click", () => { selectedPersonIndex = Number(button.dataset.personIndex); render(); }));
    initialiseWeeklyHover(mount);
  }

  function initialiseWeeklyHover(scope) {
    scope.querySelectorAll(".weekly-hover-photo,.weekly-thumb-hover").forEach(container => {
      const image=container.querySelector("img");
      const original=container.dataset.originalSrc;
      let alternates=[];
      try{alternates=JSON.parse(container.dataset.hoverImages||"[]")}catch(_){alternates=[]}
      let timer=null,index=0;
      const next=()=>{if(!alternates.length)return;image.src=alternates[index%alternates.length];index+=1};
      container.addEventListener("mouseenter",()=>{container.classList.add("is-hovering");next();if(alternates.length>1)timer=setInterval(next,2000)});
      container.addEventListener("mouseleave",()=>{container.classList.remove("is-hovering");clearInterval(timer);timer=null;index=0;image.src=original});
    });
  }

  window.renderWeeklyRoster = render;
  document.addEventListener("239-language-change", render);
  render();

  /* Keep the displayed roster aligned with the Sydney weekday across midnight. */
  window.setInterval(() => {
    const newAutomaticDay = currentSydneyDay();
    if (newAutomaticDay === automaticDay) return;
    automaticDay = newAutomaticDay;
    selectedDay = newAutomaticDay;
    selectedPersonIndex = 0;
    render();
  }, 60000);
})();
