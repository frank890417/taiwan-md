import re,sys,subprocess,urllib.parse,html
URL="https://wsts.nstc.gov.tw/stsweb/sciencepark/ScienceParkReport.aspx?language=C&quyid="
def curl(*a): return subprocess.run(['curl','-sL','-m','60','-A','Mozilla/5.0','-c','cj.txt','-b','cj.txt',*a],capture_output=True).stdout.decode('utf8','ignore')
def run(quyid,b,e,out,areas=('chkAll','chkArea1','chkArea2','chkArea3'),btn='btnQuery'):
    open('cj.txt','w').close()
    h=curl(URL+quyid)
    d=[]
    for m in re.finditer(r'<input type="hidden" name="([^"]+)" id="[^"]*" value="([^"]*)"',h): d.append((m.group(1),html.unescape(m.group(2))))
    for k in areas: d.append(('ctl00$holderMain$'+k,'on'))
    d+= [('ctl00$holderMain$ddlData_PeriodBQ',b),('ctl00$holderMain$ddlData_PeriodEQ',e),('ctl00$holderMain$'+btn,'x')]
    open('post.txt','w').write(urllib.parse.urlencode(d))
    r=curl('-e',URL+quyid,'-H','Origin: https://wsts.nstc.gov.tw','--data','@post.txt',URL+quyid)
    open(out,'w').write(r);return r
def text(r):
    s=re.sub(r'<(script|style)[\s\S]*?</\1>','',r);s=re.sub(r'<[^>]+>','|',s);s=html.unescape(s);return re.sub(r'\|(\s*\|)+','|',s)
if __name__=='__main__':
    r=run(sys.argv[1],sys.argv[2],sys.argv[3],sys.argv[4]);t=text(r);print(len(r));print(t[-3000:])
