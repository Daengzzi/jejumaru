import React, {useState, useEffect, Component} from "react";
import {BrowserRouter, Link, withRouter} from 'react-router-dom';
import "./culture.css";
import Aos from "aos";
import "aos/dist/aos.css";



function Culturebody() {

    Aos.init({
        offset: 400, // offset (in px) from the original trigger point
        delay: 0, // values from 0 to 3000, with step 50ms
        duration: 1000 // values from 0 to 3000, with step 50ms
    });

return(
    <>
        <header class="culture-header">
            <h1>문화와 역사</h1>
        </header>

        <main class="culture-container">
            <section class="culture-card">
                <img src="https://cdn.pixabay.com/photo/2013/12/08/06/42/stone-224986_1280.jpg" alt=""/>
                <div>
                    <h3>바람 - 바람 잘 날 없는 바람의 나라</h3>
                    <p>
                        태풍의 길목에 자리 잡은 제주는 바람의 섬이다. 태풍 부는 날은 바다에 서면 제주바람의 위력을 실감하고도 남는다.
                        제주만큼 다양하고 독특한 이름의 바람을 지닌 곳이 또 있을까.
                        하늬바람, 높하늬바람, 높새바람, 샛바람, 마파람, 동마파람, 갈바람, 섯바람, 섯하늬바람, 양두새바람, 양바람.
                        제주사람들은 온갖 이름으로 찾아오는 바람과 싸우고, 맞서고, 비끼고 때로는 달래고,
                        이용해가며 독특한 바람의 문화를 이루어왔다.
                        이제 제주바람은 모아지고 가두어져 전기에너지로 태어나는 새로운 시대를 맞고 있다.
                    </p>

                </div>
            </section>

            <section class="culture-card" data-aos="fade-left">
                <img src="https://cdn.pixabay.com/photo/2016/11/18/07/45/mark-1833559_1280.jpg" alt="" />
                <div>
                    <h3>돌 - 돌 없이 상상할 수 없는 돌의 섬</h3>
                    <p>
                        돌을 빼놓고는 제주를 상상할 수도 이야기할 수도 없다. 제주는 섬을 이루고 있는 땅과 산은 물론이고 섬을 빙 두른 해안선까지 온통 돌투성이인 화산섬이기 때문이다.
                        그것을 삶의 터전으로 삼아 일구며 살아야 했던 옛 제주사람들은 한 평생을 돌 속에서 돌과 더불어 살다가 돌 속으로 돌아갔다. 특히 손으로 일일이 쌓아 두른 돌담을 눈여겨보자.
                        집 어귀의 '올렛담', 집 울타리인 '울담', 밭을 두른 '밭담' 바다밭의 돌그물인 '원담', 무덤을 두른 '산담'이 다 돌담이다.
                    </p>
                </div>
            </section>

            <section class="culture-card" data-aos="fade-right">
                <img src="https://cdn.pixabay.com/photo/2015/10/21/15/00/sea-999811_1280.jpg" alt="" />
                <div>
                    <h3> 여자 - 여신의 나라, 여자의 섬</h3>
                    <p>
                        제주섬은 여신의 나라다. 창조의 신 설문대, 생명의 신 삼승, 바람의 신 영등, 농경의 신 자청비, 운명의 신 가믄장아기 등 제주섬의 중요한 신들은 물론 마을을 관장하는 당신,
                        집안을 다스리는 가신들도 거의 여신들이다. 제주는 여신의 나라인 것이다.
                        바다에 나가 물질을 하는 사람도, 밭에 나가 김을 매는 사람도, 장터에 나가 장사하는 사람도, 땔감을 구하고 물을 길어 나르는 사람도
                        여성들이었으니 어찌 '여다의 섬'으로 비쳐지지 않을 것인가.
                        여다의 섬, 그 이름은 여성들이 중심되어 이어온 제주 섬의 오랜 역사를 반영하고 있는 것이다.
                    </p>
                </div>
            </section>

            <section class="culture-card" data-aos="fade-left">
                <img src="https://cdn.pixabay.com/photo/2017/04/26/01/11/jeju-island-2261311_1280.jpg" alt="" />
                <div>
                    <h3>천년의 역사 탐라</h3>
                    <p>
                        '섬나라'라는 뜻을 지닌 '탐라'는 제주의 옛 이름이다.
                        제주섬에 탐라가 건국된 과정은 '삼성신화'로 알려진 '탐라개국신화'에 잘 나타나 있다.
                        고고학적 흔적을 보고 싶다면 '삼양동 선사 유적'을 찾아가보면 된다.
                        국가사적 416호로 지정된 삼양동 선사 유적은 원삼국시대인 기원전 3세기경
                        제주에 처음으로 형성된 대규모 마을 유적으로 탐라형성기(B.C.200~A.D.200)시대의 사회모습을 보여준다.
                        삼국시대의 탐라는 백제, 고구려, 신라와
                        각각 교역했으며, 나당연합군에 의해 백제가 멸망한 직후에는 일본과 중국 당나라와도 외교관계를 맞는 등
                        독자적인 해상왕국의 역사를 이었다.
                    </p>
                </div>
            </section>

            <section class="culture-card" data-aos="fade-right">
                <img src="https://cdn.pixabay.com/photo/2017/09/05/15/35/jeju-island-2718103_1280.jpg" alt="" />
                <div>
                    <h3>한숨으로 얼룩진 '유배 1번지'</h3>
                    <p>
                        고대 해양국가 탐라가 독립국으로서의 지위를 잃어버린 것은 고려 숙종 10년(1105)때였다.
                        고종(1213~1259) 때에 이르러서는
                        이름 또한 '바다 건너 큰 고을'이란 뜻을 지닌 '제주'로 바뀌었다.
                        고려시대 제주의 대표적인 흔적은 삼별초와 관련된 유적들이다.
                        삼별초군은 애월에 각종 방어시설뿐만 아니라 궁궐과 관아까지 갖춘 항파두리성을 쌓고
                        여몽연합군에 맞섰지만 고려 원종 14년(1273)에 함락되었다.
                        그 후 제주는 고려 말 최영 장군이 목호군을 토벌할 때까지 몽골의 지배 속에 놓여 있었다.
                        새별오름, 외돌개, 막숙, 범섬 등이 최영장군과 목호군이 격전을 벌였던 고려시대의 유적지들이다.
                    </p>
                </div>
            </section>
        </main>
    </>
)

}

class Culture extends Component{
    render() {
        return (

                <Culturebody/>


        );
    }
}

export default withRouter(Culture);
