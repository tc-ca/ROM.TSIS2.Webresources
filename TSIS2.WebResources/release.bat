@echo off
set connectionstring=%~1
set package_root=..\..\..

For /R %package_root% %%G IN (spkl.exe) do (
	IF EXIST "%%G" (set spkl_path=%%G
	goto :continue)
)

:continue
@echo Deploying using %spkl_path%

%spkl_path% webresources ./ "%connectionstring%" /p:release


if errorlevel 1 (
	echo Error Code=%errorlevel%
	exit /b %errorlevel%
)

exit

Spkl file including a specified sub path
%spkl_path% webresources Webresources "%connectionstring%" /p:release