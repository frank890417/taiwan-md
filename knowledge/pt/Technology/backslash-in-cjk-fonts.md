---
title: 'A barra invertida no caractere "gong": os dois impostos padrão cobrados por engenheiros em Taiwan diariamente'
description: 'No Windows 11 com idioma zh-TW, o script de status de tradução jogou mais de quatro mil caminhos detectados na raiz, zerando Technology. Enquanto isso, o CI do Linux na mesma semana estava verde. O script usa barra normal para separar nomes de categorias e barra invertida para discos; não consegue separar. Uma camada mais antiga está embutida no caractere: o segundo byte do "gong" em Big5 é a barra invertida ASCII, apelidada pela comunidade de desenvolvimento como Xu Gong Gai. Os valores padrão não consideraram como este equipamento estava configurado. O quotePath do Git é outra linha, com causa diferente.'
date: 2026-08-13
category: 'Technology'
tags:
  [
    'open source',
    'Windows',
    'Big5',
    'UTF-8',
    'codificação de caracteres',
    'chinês tradicional',
  ]
subcategory: '文字與工具'
author: 'Taiwan.md Contributors'
featured: false
lastVerified: 2026-08-13
lastHumanReview: false
image: '/article-images/technology/big5-gong-5c-backslash.webp'
imageAlt: 'Ao lado do grande caractere "gong" estão seus dois blocos de código Big5 A5 e 5C; o bloco 5C aponta com uma seta para a barra invertida ASCII 0x5C; abaixo está a saída real do Python, onde o segundo byte dos três caracteres Xu Gong Gai é a barra invertida.'
imageCredit: 'Taiwan.md Contributors（自製圖解）· CC BY-SA 4.0'
curation: 'incubating'
curationReason: 'unverified'
translatedFrom: 'Technology/功字裡的那根反斜線.md'
sourceCommitSha: 'ef8369eef'
sourceContentHash: 'sha256:dbee36211f1b2080'
sourceBodyHash: 'sha256:cfc0fe9c1ed37efb'
translatedAt: '2026-11-07T01:05:27.059451+00:00'
---

> **Resumo de 30 segundos:** Executei o script de status de tradução e vi 4546 na tela, todos em `root`. O CI do Linux no GitHub estava verde. Só depois percebi duas coisas. A barra invertida dos caminhos do Windows não foi separada pelo script usando barras normais. A segunda metade do código Big5 de "gong" é a própria barra invertida ASCII. Os dois mecanismos são diferentes, mas aparecem frequentemente juntos em um Windows chinês tradicional.

Eu estava mantendo o script de status de tradução do Taiwan.md no Windows 11 com idioma zh-TW. Naquela noite, executei `i18n-status.py` como de costume, esperando que o terminal imprimisse os números. O console principal era cp950. Não havia texto vermelho na saída.

A tela parou em 4546. Todos estavam em uma categoria chamada `root`. Technology estava zerado.

Na mesma semana, ao enviar para o GitHub, o CI no Linux ficou verde.

O script tinha a variável nomeada `zh_articles`, que escaneava caminhos sob `knowledge` exceto os diretórios de inglês, about e sublinhado; japonês, coreano e árabe também eram contados. Naquela noite, ele nem conseguia separar os nomes das categorias, e mais de quatro mil caminhos foram empurrados para o mesmo espaço. Sem exceções, sem avisos. A estatística parecia que todo o site havia falhado, mas nenhum arquivo estava faltando[^8].

O caminho no disco era `knowledge\Technology\algum_artigo.md`, com barras invertidas separando os diretórios. O script usava `split('/')` para pegar o nome da categoria. Isso funcionava no Linux porque o caminho já era com barra normal. No Windows, ele não conseguia separar a barra invertida, e todo o caminho voltava intacto, jogando o artigo na categoria padrão `root`[^1].

Depois de mudar para usar `pathlib` para processar diretórios, Technology tinha 59 artigos, consistente com o conteúdo do diretório. Apenas um pressuposto intermediário: qual tipo de linha seu equipamento usava para separar os diretórios.

![Saída real do terminal Python: uma mesma rota do Windows separada por split('/') retorna uma lista de um único elemento; ao ser passada para PureWindowsPath(p).parts, ele separa em três partes: knowledge, Technology e nome do arquivo](/article-images/technology/windows-path-split-vs-pathlib.svg)

_A mesma rota, duas formas de separar. `split('/')` não encontra a barra normal e retorna o original; `PureWindowsPath` reconhece a barra invertida e consegue retornar Technology._ Contribuidores do Taiwan.md, CC BY-SA 4.0.

> **📝 Nota do Curador:** A sintaxe do script não estava errada, e o CI realmente executou os testes. O ponto de ruptura está entre "o equipamento onde o autor senta" e "o equipamento que a ferramenta supõe que você usa". Essa costura não pertence a nenhum processo, então ninguém foi designado para monitorá-la.

## A linha dentro do "gong"

A primeira camada é o caminho. A segunda camada é muito mais antiga, enterrada no caractere.

O Big5 foi padronizado em 1984, um caractere chinês com dois bytes. Se o segundo byte caísse entre `0x40` e `0x7E`, ele colidiria com símbolos comuns do ASCII: `[` , `]` , `{` , `}` , `\` , `|`. O professor adjunto de Ciência da Informação da Universidade Tecnológica Chaoyang (aposentado em agosto de 2023) escreveu na página de ensino: "Como o intervalo 40-7E é um intervalo de códigos ASCII para caracteres comuns, isso às vezes causa problemas aos programadores."[^2]

O código de "gong" é `A5 5C`. O `0x5C` seguinte é a barra invertida ASCII. Um programa que escaneia strings byte por byte e trata `\` como escape ou separador pode encontrar o final de "gong" e pensar que encontrou um caminho. Se o nome do arquivo contiver "gong", ou se o caminho contiver "gong", ambos podem falhar aqui.

A comunidade de desenvolvimento em Taiwan e Hong Kong chama isso de "Xu Gong Gai": "Xu" é `B3 5C`, "gong" é `A5 5C`, e "Gai" é `BB 5C`; três caracteres comuns escritos juntos parecem um nome de pessoa[^5]. Hong Chao-gui também listou "Jia Ye Cheng Zhen Gong", onde os segundos bytes colidem com `[` , `]` , `{` , `}` , `\`, e criou a ferramenta de escaneamento `b5tm`[^2]. Um bug foi batizado com um nome, geralmente porque ele era frequente o suficiente para que uma geração tivesse que falar sobre ele.

Em 2015, o autor do blog "Dark Thread" mudou para Visual Studio 2015. O antigo `.cs` ainda estava salvo em BIG5. Após a mudança para Roslyn pelo compilador, os Xu Gong Gai no arquivo se tornaram erros de compilação.

Dois dias depois, um colega lhe disse que eles também ficaram presos por muito tempo e acabaram rastreando o artigo dele. Um usuário na internet tinha milhares de arquivos, transformou alguns e ainda restava muitos, "sendo forçado a dizer adeus ao VS2015". Ele escreveu uma pequena ferramenta para conversão em lote para UTF-8 porque não conseguia renomear manualmente[^7].

Isso não é o mesmo que `split('/')` anterior. Um é um pressuposto de ferramentas modernas sobre como os caminhos devem ser; o outro é um caractere que contém símbolos dentro do corpo, escolhido quarenta anos atrás com dois bytes. Os mecanismos são diferentes, mas a conta chega frequentemente no mesmo equipamento cp950. Como enviar o caractere para o computador na parte da entrada, veja [métodos de entrada de caracteres asiáticos orientais](/pt/technology/east-asian-input-methods/). Aqui falamos do que acontece depois que o caractere está no disco e se a cadeia de ferramentas ainda o reconhece.

## O valor padrão não abriu um branch para este equipamento

O Git tem `core.quotePath` ativado por padrão. Nomes de arquivos com bytes maiores que `0x80` são impressos pelo `git status` como sequências de escape octal, tipo `\344\270\255`. O nome do arquivo chinês ainda está lá; você apenas não entende o que seu repositório diz todos os dias[^3]. Ele escapa bytes altos UTF-8. O `0x5C` do Big5 é outra linha. Parecem ser a barra invertida, mas as causas são diferentes.

![Saída real do terminal: git status --short imprime o nome do arquivo chinês como sequência de escape octal entre aspas; ao adicionar -c core.quotePath=false, o mesmo nome de arquivo é impresso em chinês](/article-images/technology/git-quotepath-octal-cjk.svg)

_O mesmo arquivo, sob o valor padrão, há uma série de `\345\212\237`. A barra invertida aqui é um escape adicionado pelo Git e não tem relação com o `0x5C` no caractere "gong". Contribuidores do Taiwan.md, CC BY-SA 4.0._

Se o Python 3 no Windows usar `open()` sem especificar `encoding='utf-8'`, ele pode herdar a linguagem do sistema. Um arquivo UTF-8 idêntico é lido corretamente no Linux, mas ao ser decodificado com cp950 neste equipamento, pontuações ou notas de rodapé ficam corrompidos[^4]. Eu já paguei isso uma vez: usei `Get-Content | Set-Content` do PowerShell 5.1 para converter o arquivo para UTF-8, e um travessão longo virou `??` no diff. Isso também é um imposto padrão, mas não é o segundo tópico.

Quando a mensagem de status usa emoji, este terminal cp950 trava diretamente. O conjunto de caracteres não tem esses símbolos; o Python não consegue imprimi-los, e a exceção explode na camada superior. O CI do Linux não detecta isso porque ele não está rodando neste equipamento.

Git, Python, `$HOME/projeto/src` nos exemplos de caminho do CI, não abriram um branch separado para o Windows zh-TW.

Em 2015, Hong Chao-gui foi entrevistado pela iThome sobre qual formato usar para abrir arquivos governamentais e por quanto tempo eles durariam. A reportagem traduziu sua ideia: se o governo usa apenas produtos Microsoft para abrir dados de arquivos, é como confiar que a vida útil da Microsoft será maior do que a da República da China[^6]. Essa frase fala sobre formato de arquivo e longevidade. Os dados estão presos a um conjunto de ferramentas padrão; quando o tempo se estende, surge a questão: quem ainda pode ler? A colaboração open source está presa ao ambiente padrão de algum equipamento. O cabo de guerra entre tecnologia cidadã e formatos de arquivos governamentais é visto em [comunidade open source e g0v](/pt/technology/open-source-and-g0v/). Os desenvolvedores de Taiwan absorvem culturalmente esse descompasso, como visto em [espírito open source de Taiwan](/pt/technology/taiwan-open-source-spirit/).

O separador de caminho, a codificação do terminal, o `$HOME` nos exemplos de CI não abriram um branch separado para este equipamento. No dia em que os 4546 caminhos foram classificados incorretamente, nenhuma linha de código deu erro. A estatística parecia normal até você se sentar diante deste equipamento.

## Leitura Adicional

- [espírito open source de Taiwan](/pt/technology/taiwan-open-source-spirit): A cultura e o contexto da participação dos desenvolvedores de Taiwan em projetos open source.
- [métodos de entrada de caracteres asiáticos orientais](/pt/technology/east-asian-input-methods): Como os caracteres são digitados no computador, do código ao teclado.
- [comunidade open source e g0v](/pt/technology/open-source-and-g0v): A colaboração entre dados abertos e formatos governamentais.

## Fontes das Imagens

- **Código Big5 de "gong" e barra invertida (hero)**: Ilustração criada pelos Contribuidores do Taiwan.md, CC BY-SA 4.0, armazenada em `public/article-images/technology/big5-gong-5c-backslash.webp`. A linha abaixo é a saída real de `'許功蓋'.encode('big5')` no Python 3, e os códigos correspondem ao artigo Big5 na Wikipédia[^5].
- **split('/') e PureWindowsPath**: Criado pelos Contribuidores do Taiwan.md, CC BY-SA 4.0, armazenado em `public/article-images/technology/windows-path-split-vs-pathlib.svg`. O conteúdo é o resultado real da execução no Python 3; `PureWindowsPath` separa caminhos seguindo as regras do Windows em qualquer sistema operacional, portanto, pode ser reproduzido sem um equipamento Windows.
- **Saída octal de Git core.quotePath**: Criado pelos Contribuidores do Taiwan.md, CC BY-SA 4.0, armazenado em `public/article-images/technology/git-quotepath-octal-cjk.svg`. O conteúdo é a saída real do `git status --short` após adicionar o nome deste arquivo ao repositório temporário; este comportamento não tem relação com o sistema operacional.

## Referências

[^1]: [Microsoft Learn: Formato de Caminho de Arquivo no Sistema Windows](https://learn.microsoft.com/zh-tw/dotnet/standard/io/file-path-formats) — A documentação .NET descreve que os caminhos tradicionais do DOS usam barra invertida como separador de diretório, e a barra normal é convertida em barra invertida.

[^2]: [Hong Chao-gui: Problemas Big-5 ao Programar](https://frdm.cyut.edu.tw/~ckhung/b/pl/big5.php) — A página de ensino lista caracteres comuns cujo segundo byte cai na zona perigosa do ASCII (Jia Ye Cheng Zhen Gong) e apresenta a ferramenta de escaneamento b5tm. O cargo não foi mencionado no final da página. Em 2015, iThome o chamou de professor adjunto. Eu trabalhei em Ciência da Informação Chaoyang de 1997 a 2023, aposentando-me em agosto de 2023.

[^3]: [git-config: core.quotePath](https://git-scm.com/docs/git-config) — A documentação oficial explica que o padrão é exibir caminhos com bytes maiores que 0x80 como sequências de escape octal.

[^4]: [Python 3: open()](https://docs.python.org/3/library/functions.html#open) — A descrição da função aponta que, se a codificação não for especificada, pode-se herdar a linguagem do sistema como padrão.

[^5]: [Wikipédia: Big5](https://zh.wikipedia.org/zh-tw/大五碼) — Menciona "gong" 0xA55C, "Xu" 0xB35C e "Gai" 0xBB5C, e explica que este problema é apelidado de Xu Gong Gai.

[^6]: [iThome: Entrevista com Hong Chao-gui](https://www.ithome.com.tw/news/93606) — Entrevista em 2015; o artigo menciona que ele era professor adjunto do Departamento de Ciência da Informação da Universidade Tecnológica Chaoyang. A reportagem traduziu sua ideia, e a menção "vida útil da Microsoft" é apenas uma paráfrase baseada no resultado da pesquisa, não uma citação literal.

[^7]: [Dark Thread: Dark Shield - Resolvendo o Problema de Compatibilidade BIG5 do VS2015](https://blog.darkthread.net/blog/big5-utf8-source-code-batch-converter/) — Em 2015, documentou que Xu Gong Gai causava erros de compilação ao compilar código-fonte em BIG5 no Visual Studio 2015. O artigo contém "sendo forçado a dizer adeus ao VS2015".

[^8]: [taiwan-md PR #1260](https://github.com/frank890417/taiwan-md/pull/1260) — Junho de 2026. Corrigido. Antes, no Windows, as categorias restavam apenas root: 4546; após a correção, Technology zh: 59. Os emojis que causavam o travamento do terminal cp950 foram removidos.
