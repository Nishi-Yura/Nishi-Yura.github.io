import glob, re

files = glob.glob('c:/Users/nisimoto/Desktop/ポートフォリオサイト/*.html')
for path in files:
    with open(path, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()

    # Meta tags and common text
    content = re.sub(r'西本+ \| Portfolio', '西本ゆら | Portfolio', content)
    content = re.sub(r'西本+の個人ポ+トフォリオサイトです+', '西本ゆらの個人ポートフォリオサイトです。', content)
    content = re.sub(r'お問+わせはこちらから+', 'お問い合わせはこちらから。', content)

    # Contact page
    content = re.sub(r'お問+わせは、以下EメールアドレスまたEXのDMまでお気軽にご連絡ください+br>', 'お問い合わせは、以下EメールアドレスまたはXのDMまでお気軽にご連絡ください。<br>', content)
    
    # Replace broken back to top button
    content = re.sub(r'">+</a>', '">↑</a>', content)
    
    # Project specific fixes
    if 'project-coaching' in path:
        content = re.sub(r'+NG+REV+OW2 Coaching', '【NG×REV】OW2 Coaching', content)
        content = re.sub(r'@NG_NyamGaming + @Revati_jp +++Overwatch2のコ+チングサ+ビス++++のプレイヤ+に向けて+++的な技術+と+++のサポ+トを提供します++現在は新規+++', '@NG_NyamGaming と @Revati_jp 共同でOverwatch2のコーチングサービス。多くのプレイヤーに向けて、専門的な技術指導とメンタルのサポートを提供します。（現在は新規受付停止中）', content)
        content = re.sub(r'Overwatch2はチ+ムプレイと高度な状況判断が求められるゲ+ムであり++個人の力だけではランクアップの壁にぶつかるプレイヤ+が多くいます++の壁を突破するための言語化された知識が必要とされています+', 'Overwatch2はチームプレイと高度な状況判断が求められるゲームであり、個人の力だけではランクアップの壁にぶつかるプレイヤーが多くいます。その壁を突破するための言語化された知識が必要とされています。', content)
        content = re.sub(r'単なるエイム学ではなく++マインドセットの改善++チ+ムとしての戦術的なコ+チング++受講生のプレイスタイルに合わせた++的な指導を行います+', '単なるエイム学ではなく、マインドセットの改善、チームとしての戦術的なコーチング。受講生のプレイスタイルに合わせた、専門的な指導を行います。', content)

    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
