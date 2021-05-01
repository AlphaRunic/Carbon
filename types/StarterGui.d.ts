interface StarterGui extends BasePlayerGui {
	LoadScreen: ScreenGui & {
		Background: ImageLabel & {
			Bar: Frame & {
				UICorner: UICorner;
				UIGradient: UIGradient;
				Top: Frame & {
					UICorner: UICorner;
					UIGradient: UIGradient;
				};
			};
		};
	};
}
