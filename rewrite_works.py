import glob

# For REVATI
with open('c:/Users/nisimoto/Desktop/ポートフォリオサイト/project-revati.html', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace(
    '<h2 class="case-study__title">01. 概要</h2>\n                            <div class="case-study__text">\n                                <p>勝負の世界における成績の浮き沈みにとらわれず、目標達成のために粘り強く努力し続けるeスポーツチーム『REVATI』。無限のパワーと可能性を秘めたプレイヤーたちが集う場所として設立されました。</p>\n                            </div>',
    '<h2 class="case-study__title">01. 概要</h2>\n                            <div class="case-study__text">\n                                <p>自身でゼロから立ち上げたeスポーツ組織であり、現在は約〇〇名のメンバーを抱え、代表としてチーム運営やスポンサー獲得などマネジメント全般を統括しています。</p>\n                            </div>'
)

content = content.replace(
    '<h2 class="case-study__title">02. ビジョンと理念</h2>\n                            <div class="case-study__text">\n                                <p>勝つことだけが全てではなく、そこに至るまでの過程や、困難に直面した時の立ち振る舞いにこそが真の価値を生み出します。REVATIは、プレイヤー一人ひとりが持つポテンシャルを最大限に引き出し、最後までやり遂げる強さを持つチームを目指しています。</p>\n                            </div>',
    '<h2 class="case-study__title">02. 担当業務と実績</h2>\n                            <div class="case-study__text">\n                                <p>チームの代表として、選手スカウト・育成、協賛企業様との交渉、各種コミュニティ大会の企画・主催、そしてチームのブランディング戦略立案などを行っています。</p>\n                            </div>'
)

content = content.replace(
    '<h2 class="case-study__title">03. 今後の展望</h2>\n                            <div class="case-study__text">\n                                <p>国内外の大会での活躍はもちろん、イベントの主催やコミュニティの拡大を通じて、eスポーツシーン全体を盛り上げる存在になることを目標としています。プレイヤーと共に成長し続け、新しい時代を切り拓くチームとして挑戦を続けます。</p>\n                            </div>',
    '<h2 class="case-study__title">03. 課題と取り組み</h2>\n                            <div class="case-study__text">\n                                <p>チームを持続的に成長させるため、単に強い選手を集めるだけでなく、メンタルケアや独自のコーチング体制を導入しました。また、チームのクリエイティブを内製化するために「REVATI Studio」を立ち上げるなど、多角的なアプローチで組織の価値を高めています。</p>\n                            </div>'
)

with open('c:/Users/nisimoto/Desktop/ポートフォリオサイト/project-revati.html', 'w', encoding='utf-8') as f:
    f.write(content)


# For Studio
with open('c:/Users/nisimoto/Desktop/ポートフォリオサイト/project-studio.html', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace(
    '<h2 class="case-study__title">01. 概要</h2>\n                            <div class="case-study__text">\n                                <p>あらゆるクリエイティブをワンストップで提供するクリエイティブスタジオ。映像制作、デザイン、イラストレーションを主軸としつつ、楽曲制作やエンジニアリング（Web・ソフトウェア開発など）まで幅広く対応しています。</p>\n                            </div>',
    '<h2 class="case-study__title">01. 概要</h2>\n                            <div class="case-study__text">\n                                <p>映像制作やデザイン、ソフトウェア開発まで幅広く手がけるクリエイティブスタジオです。eスポーツチーム「REVATI」の派生事業として自身で立ち上げ、代表およびプロジェクトマネージャーとして制作全体の進行管理を行っています。</p>\n                            </div>'
)

content = content.replace(
    '<h2 class="case-study__title">02. 制作方針</h2>\n                            <div class="case-study__text">\n                                <p>多種多様なクリエイターが在籍している強みを活かし、企画から制作、最終的なアウトプットまで一貫したクリエイティブを提供。各分野のプロフェッショナルが連携することで、統一感のある高品質な作品を創り出します。</p>\n                            </div>',
    '<h2 class="case-study__title">02. 担当業務</h2>\n                            <div class="case-study__text">\n                                <p>クリエイターのディレクション、クライアントとの折衝、案件の進行管理（プロジェクトマネジメント）を担当しています。多彩な才能を持つクリエイターたちをまとめ上げ、品質とスケジュールの両方を担保しています。</p>\n                            </div>'
)

content = content.replace(
    '<h2 class="case-study__title">03. スタジオの役割</h2>\n                            <div class="case-study__text">\n                                <p>映像作家、デザイナー、イラストレーター、エンジニアなど、多彩な才能が集い、互いに刺激を与え合いながら成長できるプラットフォームとしての役割も担っています。REVATIの活動を強力にバックアップするだけでなく、外部からの制作案件も数多く請け負っており、クライアントの課題解決に向けた幅広いソリューションを提供しています。</p>\n                            </div>',
    '<h2 class="case-study__title">03. 課題と取り組み</h2>\n                            <div class="case-study__text">\n                                <p>多種多様なスキルを持つクリエイターが連携するため、コミュニケーションの円滑化が課題でした。そこで、効率的な制作フローの構築と一貫したディレクションを行うことで、外部からの受託案件にも対応できる高品質なクリエイティブ集団へと成長させました。</p>\n                            </div>'
)

with open('c:/Users/nisimoto/Desktop/ポートフォリオサイト/project-studio.html', 'w', encoding='utf-8') as f:
    f.write(content)


# For Coaching
with open('c:/Users/nisimoto/Desktop/ポートフォリオサイト/project-coaching.html', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace(
    '<h2 class="case-study__title">01. 概要</h2>\n                            <div class="case-study__text">\n                                <p>@NG_NyamGaming と @Revati_jp が共同運営するOverwatch2のコーチングサービス。幅広いランク帯のプレイヤーに向けて、実践的な技術指導とメンタル面のサポートを提供しました。（※現在は新規受付終了）</p>\n                            </div>',
    '<h2 class="case-study__title">01. 概要</h2>\n                            <div class="case-study__text">\n                                <p>@NG_NyamGaming と @Revati_jp の共同事業として立ち上げたOverwatch2のコーチングサービスです。事業の企画・立ち上げから参画し、幅広いプレイヤーに向けて実践的な技術指導とサポートを提供する仕組みを構築しました。（※現在は新規受付終了）</p>\n                            </div>'
)

content = content.replace(
    '<h2 class="case-study__title">02. 背景と課題</h2>\n                            <div class="case-study__text">\n                                <p>Overwatch2はチームプレイと高度な状況判断が求められるタイトルであり、個人の力だけではランクアップの壁にぶつかるプレイヤーが数多く存在していました。その壁を突破するための言語化された知識が必要とされていました。</p>\n                            </div>',
    '<h2 class="case-study__title">02. 担当業務</h2>\n                            <div class="case-study__text">\n                                <p>サービスの共同運営者として、コーチングカリキュラムの策定、受講生の管理、プロモーション活動を担当しました。プレイヤーが直面する課題を言語化し、分かりやすく指導するための体制づくりに注力しました。</p>\n                            </div>'
)

content = content.replace(
    '<h2 class="case-study__title">03. 解決策と成果</h2>\n                            <div class="case-study__text">\n                                <p>単なるエイム指導ではなく、立ち回りやマインドセットの改善、チームとしての動き方を論理的にコーチング。受講生が自身のプレイスタイルを客観視し、継続的に成長できる土台を作り上げました。</p>\n                            </div>',
    '<h2 class="case-study__title">03. 課題と取り組み</h2>\n                            <div class="case-study__text">\n                                <p>独学ではランクアップの壁にぶつかるプレイヤーが多いという課題がありました。そこで、単なるテクニック指導にとどまらず、マインドセットの改善や論理的な思考法を教えることで、受講生が自走して成長できるサービスを実現しました。</p>\n                            </div>'
)

with open('c:/Users/nisimoto/Desktop/ポートフォリオサイト/project-coaching.html', 'w', encoding='utf-8') as f:
    f.write(content)

