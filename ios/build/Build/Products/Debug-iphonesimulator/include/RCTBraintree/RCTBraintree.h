//
//  RCTBraintree.h
//  RCTBraintree
//
//  Created by Jain, Mitesh on 10/20/16.
//  Copyright © 2016 Jain, Mitesh. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "RCTBridgeModule.h"
#import <BraintreeCore/BraintreeCore.h>
#import <BraintreeUI/BraintreeUI.h>
#import <BraintreeCard/BraintreeCard.h>
#import <BraintreePayPal/BraintreePayPal.h>

@interface RCTBraintree : NSObject  <RCTBridgeModule,  BTDropInViewControllerDelegate, BTViewControllerPresentingDelegate>

@property (nonatomic, strong) BTAPIClient *braintreeClient;
@property (nonatomic, strong) UIViewController *reactNativeController;

@property (nonatomic, strong) RCTResponseSenderBlock callback;

//+ (instancetype)sharedInstance;
//
//- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url sourceApplication:(NSString *)sourceApplication annotation:(id)annotation;

@end
