// Tiny stack VM: exact ISA semantics.
import { mkdirSync as M, readdirSync as R, readFileSync as F, writeFileSync as W } from 'node:fs';
import { join as J } from 'node:path';
const P=[0,1,4,5,6,8,9,10,11,15,17,32,36,65,99];
const T="akncehijoooooooogggggggdgggdgggogggooooooooooooolmmlaooooooooooodfooooooooooooooccbc";
const z=()=>{throw 4;};
const B=[(a,b)=>a+b,(a,b)=>a-b,Math.imul,(a,b)=>b?a===-2147483648&&b===-1?a:a/b:z(),(a,b)=>b?b===-1?0:a%b:z(),(a,b)=>b?(a>>>0)/(b>>>0)|0:z(),(a,b)=>b?(a>>>0)%(b>>>0):z(),0,(a,b)=>a&b,(a,b)=>a|b,(a,b)=>a^b,0,(a,b)=>a<<(b&31),(a,b)=>a>>(b&31),(a,b)=>a>>>(b&31),0,(a,b)=>a===b?1:0,(a,b)=>a<b?1:0,(a,b)=>(a>>>0)<(b>>>0)?1:0];
function run(p,q){
const n=p.length,D=new Int32Array(576),C=D.subarray(256,320),E=D.subarray(320),o=new Uint8Array(65536);
let s=0,c=0,l=0,i=0,pc=0,t=0;
const d=(e)=>({out:o.slice(0,l),code:e});
try{
for(;;){
if(t===1e6)throw 10;
if(pc<0||pc>=n)throw 9;
const op=p[pc],k=P[T.charCodeAt(op)-97];
if(!(k<90))throw 5;
const imm=k>>4,w=(k>>2)&3,u=k&3;
if(pc+imm>=n)throw 9;
t++;
const x=pc+1+imm;
if(s<w)throw 2;
if(s-w+u>256)throw 3;
pc=x;
switch(op){
case 0:throw 0;
case 1:D[s++]=p[x-1]<<24>>24;break;
case 2:D[s++]=p[x-4]|p[x-3]<<8|p[x-2]<<16|p[x-1]<<24;break;
case 3:s--;break;
case 4:D[s]=D[s-1];s++;break;
case 5:{const v=D[s-1];D[s-1]=D[s-2];D[s-2]=v;break;}
case 6:D[s]=D[s-2];s++;break;
case 7:{const v=D[s-3];D[s-3]=D[s-2];D[s-2]=D[s-1];D[s-1]=v;break;}
case 23:D[s-1]=-D[s-1];break;
case 27:D[s-1]=~D[s-1];break;
case 48:case 49:case 50:{
const rel=(p[x-2]|p[x-1]<<8)<<16>>16;
if(op===48||(D[--s]===0)===(op===49))pc=x+rel;
break;}
case 51:
if(c===64)throw 7;
C[c++]=x;pc=p[x-2]|p[x-1]<<8;break;
case 52:
if(c===0)throw 8;
pc=C[--c];break;
case 64:case 65:{
const a=D[s-1];
if(a<0||a>255)throw 6;
if(op===64)D[s-1]=E[a];else{s-=2;E[a]=D[s];}
break;}
case 80:{
const S=String(D[s-1]);
if(l+S.length>65536)throw 11;
s--;
for(let j=0;j<S.length;)o[l++]=S.charCodeAt(j++);
break;}
case 81:
if(l>65535)throw 11;
o[l++]=D[--s]&255;break;
case 82:D[s++]=i<q.length?q[i++]:-1;break;
case 83:throw D[--s]&255;
default:D[s-2]=B[op-16](D[s-2],D[s-1]);s--;break;
}
}
}catch(e){return d(e);}
}
const I=process.env.MAKEFUN_INPUT_DIR??'/input',O=process.env.MAKEFUN_OUTPUT_DIR??'/output';
for(const id of R(I)){
const r=run(F(J(I,id,'program.bin')),F(J(I,id,'input.bin')));
M(J(O,id),{recursive:true});
W(J(O,id,'stdout.bin'),r.out);
W(J(O,id,'exit.txt'),`${r.code}\n`);
}
