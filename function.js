
    function print(data){
        document.write(data+'<br>');
    }

    function question(id,volume,subject,type,min,max,question_formula,ans_formula){
        this.id=id;
        this.volume=volume;
        this.subject=subject;
        this.grade=Math.ceil(volume/2);
        this.type=type;
        this.question_formula=question_formula;
        this.ans_formula =ans_formula;
        this.formula_string=question_formula.concat("$",ans_formula);
        this.data_string=make_question(this.formula_string,min,max);
        this.position=this.data_string.indexOf("$",0)+1;
        this.ans=this.data_string.substr(this.position,this.data_string.length-this.position);
        this.question_data=this.data_string.substr(0,this.position-1);
    };



    function getrandom(min,max){
        return Math.floor(Math.random()*max)+min;
    };
 

    function calculate(formula){
        for(var i=0;i<formula.length;i++){
            if(isnumber(formula.substr(i,1))==false){
                var operator_position = i+1;
            }
        }
        var x_count=operator_position-1;
        var y_count=formula.length-operator_position;
        var x = Number(formula.substr(0,x_count));
        var y = Number(formula.substr(operator_position,y_count));
        var operator = formula.substr(operator_position-1,1)
        switch(operator){
            case '+': ans = x+y;break;
            case '-': ans = x-y;break;
            case '*': ans = x*y;break;
            case '/': ans = x/y;break;
            case '^': ans = x**y;break;
        }
        return ans;
    };

    function remove_bracket(string,min,max){
        var left_bracket;
        var right_bracket;
        var left_string;
        var right_string;
        var middle_string;
        var all_string;
        string = convert_all_var(string,min,max);
        left_bracket=string.lastIndexOf("[",string.length)+1;
        right_bracket=string.indexOf("]",left_bracket)+1;
        left_string=string.substr(0,left_bracket-1);
        right_string=string.substr(right_bracket,string.length-right_bracket);
        middle_string=calculate(string.substr(left_bracket,right_bracket-left_bracket-1));
        all_string=left_string.concat(middle_string,right_string);
    
        return all_string;
    }

    function make_question(string,min,max){

        while(string.indexOf("[",0)!=-1){
            string = remove_bracket(string,min,max);
    }
    return string;
    }


    function isnumber(string){
        return !isNaN(Number(string));
    }

    function convert_all_var(string,min,max){
        while(string.indexOf("#",0)!=-1){
            string = convert_variable(string,min,max);
        }
        return string;
    }
    
    function convert_variable(string,min,max){
        var position_symbol = string.indexOf("#",0);
        var position_variable = position_symbol+1;
        var variable = string.substr(position_symbol,1).concat(string.substr(position_variable,1));
        var random = getrandom(min,max);
        while(string.indexOf(variable,0)!=-1){
            string = string.replace(variable,random);
        }
        return string;
    
    }

    function print_question_data(question_name){
        print('id：')
        print(question_name.id);
        print('volume：');
        print(question_name.volume);
        print('subject：');
        print(question_name.subject);
        print('grade：');
        print(question_name.grade);
        print('type：');
        print(question_name.type);
        print('question_formula：');
        print(question_name.question_formula);
        print('ans_formula：');
        print(question_name.ans_formula);
        print('question_data：');
        print(question_name.question_data);
        print('ans：');
        print(question_name.ans);
        
    }


