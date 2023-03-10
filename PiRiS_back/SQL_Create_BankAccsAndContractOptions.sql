USE [PiRIS]
GO

INSERT INTO [dbo].[Currencies]
           ([Name]
           ,[BynPrice])
     VALUES
           ('BYN',1),
		   ('USD',2.7),
		   ('EUR',2.8)

GO

INSERT INTO [dbo].[Accounts]
           ([Number]
           ,[Code]
           ,[IsActive]
           ,[Debet]
           ,[Credit]
           ,[CurrencyId]
           ,[Pin])
     VALUES
           ('7327732773277327','7327',0,100000000000,0,1,'1111'),
		   ('1010101010101010','1010',1,0,0,1,'1111');
GO

INSERT INTO [dbo].[DebetContractOptions]
           ([Name]
           ,[Description]
           ,[AvailableCurrencies]
           ,[SumFrom]
           ,[SumTo]
           ,[MinDurationInMonth]
           ,[MaxDurationInMonth]
           ,[PercentPerYear]
           ,[IsRequestable])
     VALUES
           (N'�������� �������������',N'�������� ����� � ���. ������ �� ���� �� 3 �� 12 ���. ��� 10% �������','BYN',1000,10000000,3,12,0.1,1),
		   (N'����������� �������������',N'����������� ����� � ���. ������ �� ���� �� 6 �� 24 ���. ��� 17% �������','BYN',1000,10000000,6,24,0.17,0),
		   (N'����������� ��������',N'����������� ����� � ��. ������ �� ���� �� 3 �� 24 ���. ��� 5% �������','USD/EUR',1000,10000000,3,24,0.03,0);

INSERT INTO [dbo].[CreditContractOptions]
           ([IsDifferentive]
           ,[Name]
           ,[Description]
           ,[AvailableCurrencies]
           ,[SumFrom]
           ,[SumTo]
           ,[MinDurationInMonth]
           ,[MaxDurationInMonth]
           ,[PercentPerYear])
     VALUES
           (1,N'������������������ ���������������',N'������������������ ��������������� ������ � ���. ������ �� ���� �� 2� ���','BYN',500,10000,3,24,0.3),
		   (0,N'����������� ���������������',N'����������� ��������������� ������ � ���. ������ �� ���� �� 2� ���','BYN',500,10000,3,24,0.3);

	DELETE FROM [Transactions];
	DELETE FROM [Accounts];
	DELETE FROM [DebetContracts];
	DELETE FROM [CreditContracts];


