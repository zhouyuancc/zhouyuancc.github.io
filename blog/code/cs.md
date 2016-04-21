//
//  WorkFlowViewController.m
//  RniuOA_iOS
//
//  Created by ZhouYuan on 15/6/3.
//  Copyright (c) 2015年 锐牛科技有限公司. All rights reserved.
//  我的工作

//重写搜索方法
-(NSPredicate *)setSearchWay:(NSString *)changeinfo
{
	//参数Run_name、bzlc是模型WorkInfo的成员变量
    return [NSPredicate predicateWithFormat:@"self.%@ contains[cd] %@ OR self.%@ contains[cd] %@", @"Run_name", changeinfo, @"bzlc", changeinfo];

}
￼
//
//  NoticeViewController.m
//  00-ItcastLottery
//
//  Created by ZhangJIanQi on 15/5/19.
//  Copyright (c) 2015年 itcast. All rights reserved.
//

-(void) initSecondSearch{

——————————————————————————————————————————————————————————————————————————————————————————————————————————
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(textChange) name:UITextFieldTextDidChangeNotification object:_searchField];
——————————————————————————————————————————————————————————————————————————————————————————————————————————

    //搜索框点击事件
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(textOnfocus) name:UITextFieldTextDidBeginEditingNotification object:_searchField];
 
    //分割线
    UIView *divider = [[UIView alloc] init];
    divider.backgroundColor = [UIColor blackColor];
    divider.alpha = 0.1;
    CGFloat dividerX= 0;
    CGFloat dividerH= 1;
    CGFloat dividerY= CGRectGetMaxY(_searchBackImage.frame) + 6 - dividerH;
    CGFloat dividerW= self.view.frame.size.width;
    divider.frame = CGRectMake(dividerX, dividerY, dividerW, dividerH);
    [self.view addSubview:divider];
}

-(void)textChange
{
    NSLog(@"%@",_searchField.text);
    if ([_searchField.text isEqualToString:@""]){
        self.SearchReslutArray = self.NoticeArray;
    } else {
        //        NSPredicate *predicate = [NSPredicate predicateWithFormat:@"self.%@ contains[cd] %@ OR self.%@ contains[cd] %@", @"InfoTitle", _searchField.text, @"InfoContent", _searchField.text];
        
        ZYLog(@"self.NoticeArray %@",self.NoticeArray);

        ZYLog(@"[self setSearchWay:_searchField.text] %@",[self setSearchWay:_searchField.text]);
        //SELF."title" CONTAINS[cd] "关" OR SELF."Content" CONTAINS[cd] "关"
        //SELF."Run_name" CONTAINS[cd] "专" OR SELF."Flow_name" CONTAINS[cd] "专"

———————从数组self.NoticeArray中筛选包含关键字_searchField.text的数组，并赋值给self.SearchReslutArray————————————

        self.SearchReslutArray = [self.NoticeArray filteredArrayUsingPredicate:[self setSearchWay:_searchField.text]];
———————filter过滤——————————————————————————————————————————————————————————————————————————————————————————

        ZYLog(@"self.SearchReslutArray %@",self.SearchReslutArray);
    }
    [self.NoticeTableview reloadData];

}