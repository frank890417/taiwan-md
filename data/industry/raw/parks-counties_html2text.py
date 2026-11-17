import sys,re,html
s=open(sys.argv[1],encoding='utf-8',errors='ignore').read()
s=re.sub(r'<(script|style)[\s\S]*?</\1>','',s)
s=re.sub(r'<[^>]+>','\n',s); s=html.unescape(s)
print(re.sub(r'\n\s*\n+','\n',s))
