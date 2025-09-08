import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {
  Attendance,
  AttendanceReport,
  AttendanceReportDetail,
  CameraView,
  Home,
  Leave,
  LeaveCreate,
  Login,
  Offday,
  OffdayCreate,
  OSA,
  OSAReport,
  Permit,
  PermitCreate,
  PresenceLoc,
  PresencePhoto,
  PresencePhotoPreview,
  PricingList,
  PricingReport,
  Register,
  Report,
  ReportPhoto,
  SickLeave,
  SickLeaveCreate,
  Splash,
  StoreDetail,
  StorePhoto,
  StoreVisit,
  StoreVisitPhotoPreview,
  StoreZonation,
  Summary,
} from '../screens';

const Stack = createStackNavigator();

export default function Router() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Attendance" component={Attendance} />
      <Stack.Screen name="PresenceLoc" component={PresenceLoc} />
      <Stack.Screen name="PresencePhoto" component={PresencePhoto} />
      <Stack.Screen
        name="PresencePhotoPreview"
        component={PresencePhotoPreview}
      />
      <Stack.Screen name="StoreVisit" component={StoreVisit} />
      <Stack.Screen name="StoreDetail" component={StoreDetail} />
      <Stack.Screen name="StorePhoto" component={StorePhoto} />
      <Stack.Screen
        name="StoreVisitPhotoPreview"
        component={StoreVisitPhotoPreview}
      />
      <Stack.Screen name="StoreZonation" component={StoreZonation} />
      <Stack.Screen name="Report" component={Report} />
      <Stack.Screen name="ReportPhoto" component={ReportPhoto} />
      <Stack.Screen name="CameraView" component={CameraView} />
      <Stack.Screen name="PricingList" component={PricingList} />
      <Stack.Screen name="PricingReport" component={PricingReport} />
      <Stack.Screen name="OSA" component={OSA} />
      <Stack.Screen name="OSAReport" component={OSAReport} />
      <Stack.Screen name="AttendanceReport" component={AttendanceReport} />
      <Stack.Screen
        name="AttendanceReportDetail"
        component={AttendanceReportDetail}
      />
      <Stack.Screen name="Summary" component={Summary} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="SickLeave" component={SickLeave} />
      <Stack.Screen name="Permit" component={Permit} />
      <Stack.Screen name="Offday" component={Offday} />
      <Stack.Screen name="Leave" component={Leave} />
      <Stack.Screen name="SickLeaveCreate" component={SickLeaveCreate} />
      <Stack.Screen name="PermitCreate" component={PermitCreate} />
      <Stack.Screen name="OffdayCreate" component={OffdayCreate} />
      <Stack.Screen name="LeaveCreate" component={LeaveCreate} />
    </Stack.Navigator>
  );
}
