// id rect for tetris
var idRectTetris=0;
// lenght of snake
var lengthSnake = 0;

class Rect{
    constructor(x,y,size,color,apendTO){
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.apendTO = apendTO;
    }
    getRect(){
        return document.getElementById(this.id);
    }
    get getX(){
        return this.x;
    }
    get getY(){
        return this.y;
    }
    get getSize(){
        return this.rect.style.width;
    }
    setX(x){
        this.x=x;
        document.getElementById(this.id).style.left = this.x+'px';
    }
    setY(y){
        this.y=y;
        document.getElementById(this.id).style.top = this.y+'px';
    }
    setXY(x,y){
        this.x=x;
        this.y=y;
        document.getElementById(this.id).style.left = this.x+'px';
        document.getElementById(this.id).style.top = this.y+'px';
    }
    apendToGame(){
        this.apendTO.appendChild(this.rect);
        document.getElementById(this.id).style.backgroundColor=this.color;
        document.getElementById(this.id).style.width=this.size+'px';
        document.getElementById(this.id).style.height=this.size+'px';
        this.setX(this.x);
        this.setY(this.y);
    }
    setColor(color){
        this.color = color;
        document.getElementById(this.id).style.backgroundColor=this.color;
    }
    setText(str){
        document.getElementById(this.id).innerText=str;
    }
}
class Snake extends Rect{
    constructor(x,y,size,color,apendTO){
        super(x,y,size,color,apendTO);
        this.id = lengthSnake;
        this.rect = document.createElement('DIV');
        this.rect.setAttribute('class','rect');
        this.rect.setAttribute('id',this.id);
        this.apendToGame();
        lengthSnake++;
    }
}
class Fruit extends Rect {
    constructor(x,y,size,color,apendTO){
        super(x,y,size,color,apendTO);
        this.id = 'fruit';
        this.rect = document.createElement('DIV');
        this.rect.setAttribute('class','rect');
        this.rect.setAttribute('id',this.id);
        this.apendToGame();
    }
}

class Tetris extends Rect{
    constructor(x,y,size,color,apendTO){
        super(x,y,size,color,apendTO);
        this.id = idRectTetris;
        this.rect = document.createElement('DIV');
        this.rect.setAttribute('class','rect');
        this.rect.setAttribute('id',this.id);
        this.apendToGame();
        idRectTetris++;
        document.getElementById(this.id).addEventListener('click',()=>{
            console.log('=='+this.getCordRow+','+this.getCordCol);
        });
    }
    apendToGame(){
        this.apendTO.appendChild(this.rect);
        document.getElementById(this.id).style.backgroundColor=this.color;
        document.getElementById(this.id).style.width=this.size+'px';
        document.getElementById(this.id).style.height=this.size+'px';
        this.setX(this.x*this.size);
        this.setY(this.y*this.size);
    }
    setOffset(x,y) {
        this.setX(this.getX+x);
        this.setY(this.getY+y);
    }
    get getCordCol(){
        return this.x/this.size;
    }
    get getCordRow(){
        return this.y/this.size;
    }
}
class Table {
    constructor(row,col,sizeRect){
        this.row=row;
        this.col=col;
        this.table=[];
        this.sizeRect = sizeRect;
        for(let i=0;i<row;i++){
            this.table[i] = new Array();
            for(let j=0;j<col;j++){
                this.table[i][j]=0;
            }
        }
    }
    get getTable(){
        return this.table;
    }
    getCord(r,c){
        return this.table[r][c];
    }
    setCord(r,c){
        this.table[r][c]=1;
    }
    isCordOn(r,c){
        if(this.table[r][c]!=0){
            return true;
        }
        return false;
    }
    isShapeStop(shape,offset){
        for(let i=0;i<shape.length;i++){
            for(let j=0;j<shape[i].length;j++){
                if((i+offset.y+1) >=0 && shape[i][j]!=0){
                    if((offset.y+shape.length) > (this.row-1)){
                        return true;
                    }
                    else if((this.isCordOn((i+offset.y+1),j+offset.x))){
                        return true;
                    }
                }
            }
        }
        return false;
    }
    setCordinats(shape,offset){
        for(let i=0;i<shape.length;i++){
            for(let j=0;j<shape[i].length;j++){
                if(shape[i][j]!=0)
                    this.setCord((i+offset.y),j+offset.x);
            }
        }

    }
    checkSide(shape,offset,side){ // side -1 is left and 1 is right
        for(let i=0;i<shape.length;i++){
            for(let j=0;j<shape[i].length;j++){
                if(side=='right'){
                    if(((offset.x)+shape[0].length) < this.col){
                        return true;
                    }      
                }
                else if(side=='left'){
                    if((offset.x) > 0){
                        return true;
                    }    
                }
            }
        }
        return false;
    }
    isRowEmpty(row){
        for(let i=0;i<row.length;i++)
            if(row[i]!=0)
                return false;
        return true;
    }
    isDeleteRow(row){
        for(let i=0;i<row.length;i++)
            if(row[i]==0)
                return false;
        return true;
    }
    drawShape(shape,offset,color){
        for(let i=(shape.length-1);i>=0;i--){
            for(let j=0;j<shape[i].length;j++){
                if(shape[i][j]!=0){
                    if((offset.y+i)>=0)
                        new Tetris(j+offset.x,i+offset.y,sizeRect,color,divGame);
                }
            }
        }
    }
    drawTable(){
        for(let i=(this.row-1);i>=0;i--){
            for(let j=0;j<this.col;j++){
                if(this.table[i][j]!=0){
                    new Tetris(j,i,sizeRect,'red',divGame);
                }
            }
        }
    }
    checkFullRows(){
        var count = 0;
        for(let i=(this.row-1);i>=0;i--){
            if(this.isDeleteRow(this.table[i])){
                this.table[i]=[0,0,0,0,0,0,0,0,0,0];
                count++;
            }
        }
        this.fixTableNew();
        return count;
    }
    fixTable(){
        let newTable=[];
        let newRow=((this.row-1)-this.getHeightEmpty());
        for(let i=(this.row-1);i>=0;i--,newRow--){
            newTable[i] = new Array();
            for(let j=0;j<this.col;j++){
                if(newRow>=0){
                    newTable[i][j]=this.table[newRow][j];
                }
                else{
                    newTable[i][j]=this.table[i][j];
                }
            }
        }
        this.table=newTable;
    }
    isRowEmpty(row){
        for(let i=0;i<row.length;i++)
            if(row[i]!=0)
                return false;
        return true;
    }
    getHeightEmpty(indexDromRow){
        var h=0;
        for(let i=indexDromRow;i>=0;i--){
            if(this.isRowEmpty(this.table[i]))
                h++;
            else break;
        }
        return h;
    }
    fixTableNew(){
        let newTable=[];
        for(let i=0;i<this.row;i++){
            newTable[i] = new Array();
            for(let j=0;j<this.col;j++){
                newTable[i][j]=0;
            }
        }
        for(let i=(this.row-1);i>=0;i--){
            if(this.isRowEmpty(this.table[i])){
                let h = this.getHeightEmpty(i);
                let rowNumber=i;
                for(;!this.isRowEmpty((rowNumber-h)) || (rowNumber-h)>=0;rowNumber--){
                    newTable[rowNumber]=this.table[rowNumber-h];
                }
                i=rowNumber-h;
            }
            else
                newTable[i] = this.table[i];
        }
        this.table=newTable;
    }
    isGameOver(){
        if(this.isRowEmpty(this.table[0])==false){
            return true;
        }
        return false;
    }
}