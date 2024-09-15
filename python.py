def swap(s1,s2):
    arr=[]
    str=list(s1)
    n=len(s1)
    for x in range(0,len(str)//2):
        str[x],str[n-x-1]=str[n-x-1],str[x]
    result="".join(str[x])    
    print(result)
    if result==s2:
        return True
    else:
        return False    






print(swap("bank","knab"))    